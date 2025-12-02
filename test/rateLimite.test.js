import { createClient } from 'redis';
import { connectRedis } from '../func/Redis.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import cfg from '../config/default.cjs';
import chalk from 'chalk';

const originalLog = console.log;
const originalError = console.error;

const shouldSuppress = (args) => {
    const msg = args.join(' ');
    return msg.includes('[RateLimit]') || (typeof args[0] === 'string' && args[0].includes('RateLimit'));
};

console.log = (...args) => {
    if (shouldSuppress(args)) return;
    originalLog.apply(console, args);
};

console.error = (...args) => {
    if (shouldSuppress(args)) return;
    originalError.apply(console, args);
};

async function runTest() {
    const redisConfig = cfg.redis;
    const client = createClient({
        socket: {
            host: redisConfig.host,
            port: redisConfig.port
        },
        password: redisConfig.password || undefined
    });
    
    const connected = await connectRedis(client);
    if (!connected) {
        console.error('Failed to connect to Redis');
        process.exit(1);
    }

    const rateConfig = cfg.rateLimiter;
    const routesToTest = [];

    if (rateConfig.routes) {
        for (const [key, config] of Object.entries(rateConfig.routes)) {
            let url = `/api/${key.replace('.', '/')}`;
            let method = 'GET';

            if (config.match) {
                url = config.match.url;
                method = config.match.method || 'GET';
            } else if (key === 'mail.sendEmail') {
                method = 'POST';
            } else if (key === 'counter.increment') {
                method = 'POST';
            }

            routesToTest.push({
                name: key,
                url: url,
                method: method,
                maxRequests: config.maxRequests,
                windowSeconds: config.windowSeconds
            });
        }
    }

    routesToTest.push({
        name: 'random.route',
        url: '/api/random/route',
        method: 'GET',
        maxRequests: rateConfig.default.maxRequests,
        windowSeconds: rateConfig.default.windowSeconds
    });

    const results = [];

    for (const route of routesToTest) {
        const result = await testRoute(client, route);
        results.push({ name: route.name, ...result });
    }

    await client.disconnect();
    console.log('\n{reacpa test}');
    
    let allPassed = true;
    results.forEach(r => {
        console.log(`${r.name}:`);
        console.log(`- passed: ${r.passed ? 'ok' : 'fail'}`);
        console.log(`- send request: ${r.sent}`);
        console.log(`- blocked at: ${r.blockedAt + 1}`);

        if (!r.passed) {
            allPassed = false;
        }
    });

    if (allPassed) {
        console.log('test passed');
    } else {
        console.log('not passed');
        process.exit(1);
    }
}

async function testRoute(client, route) {
    console.log(`test {route:: ${route.name}}`);
    console.log('flood');
    
    const req = {
        ip: '127.0.0.1',
        originalUrl: route.url,
        method: route.method || 'GET',
        headers: {}
    };

    const res = {
        _status: 200,
        _headers: {},
        _json: null,
        status(code) {
            this._status = code;
            return this;
        },
        json(data) {
            this._json = data;
            return this;
        },
        set(key, value) {
            this._headers[key] = value;
        }
    };

    const next = () => 'next';

    const redisKey = route.name.replace(/\./g, ':'); 
    const key = `rate:${redisKey}:${req.ip}`;
    
    await client.del(key);

    let requestsSent = 0;

    try {
        for (let i = 1; i <= route.maxRequests; i++) {
            requestsSent++;
            res._status = 200;
            res._json = null;
            
            const result = await rateLimiter(req, res, next);
            
            if (result !== 'next') {
                console.error(chalk.red(`\n[FAIL] Request ${i} for ${route.name} failed. Status: ${res._status}`));
                return { passed: false, sent: requestsSent, blockedAt: requestsSent };
            }
        }

        requestsSent++;
        const blockedResult = await rateLimiter(req, res, next);
        if (res._status !== 429) {
            console.error(chalk.red(`[FAIL] Request ${route.maxRequests + 1} for ${route.name} was NOT blocked. Status: ${res._status}`));
            return { passed: false, sent: requestsSent, blockedAt: 'never' };
        }
        
        return { passed: true, sent: requestsSent, blockedAt: requestsSent };
    } catch (e) {
        console.error(e);
        return { passed: false, sent: requestsSent, blockedAt: 'error', error: e };
    } finally {
        await client.del(key);
    }
}

runTest().catch(err => {
    console.error('Test Error:', err);
    process.exit(1);
});
