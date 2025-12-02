import chalk from 'chalk';
import { RedisClient } from '../func/Redis.js';
import getConfig from 'config';
import { writeToLog } from './log.js';

// get confg
const rateConfig = (() => {
    try {return getConfig.has('rateLimiter') ? getConfig.get('rateLimiter') : null;
    } catch (err) {
        console.warn(chalk.yellow('RateLimiter: unable to read config.rateLimiter, falling back to env/defaults'));
        return null;
    }
})();

// log config status
try {
    const enabled = !(rateConfig && rateConfig.enabled === false);
    const defaultCfg = rateConfig && rateConfig.default ? rateConfig.default : { windowSeconds: 60, maxRequests: 5 };
    const routes = rateConfig && rateConfig.routes ? Object.keys(rateConfig.routes).join(', ') : '(none)';
    console.log(chalk.green(`RateLimiter loaded: enabled=${enabled} default=${defaultCfg.maxRequests}/${defaultCfg.windowSeconds}s routes=${routes}`));
    writeToLog(`RateLimiter loaded enabled=${enabled} default=${defaultCfg.maxRequests}/${defaultCfg.windowSeconds}s routes=${routes}`, 'rateLimiter');
} catch (e) { }

//parse url if missed 
function normalizeUrl(url) {
    if (!url) return '';
    let clean = url.split('?')[0];
    if (clean.endsWith('/') && clean.length > 1) {clean = clean.slice(0, -1); }
    return clean.toLowerCase();
}

// Determine rate limit for a request
function getLimitsContext(req) {
    const defaults = {
        windowSeconds: parseInt(process.env.RATE_WINDOW_SECONDS || '60', 10),
        maxRequests: parseInt(process.env.RATE_MAX_REQUESTS || '5', 10),
    };

    const rawUrl = req.originalUrl || req.url || '';
    const currentUrl = normalizeUrl(rawUrl);
    const currentMethod = (req.method || 'GET').toUpperCase();

    if (rateConfig && rateConfig.enabled !== false && rateConfig.routes) {
        for (const [key, routeCfg] of Object.entries(rateConfig.routes)) {
            if (routeCfg.match) {
                const configUrl = normalizeUrl(routeCfg.match.url);
                const configMethod = routeCfg.match.method ? routeCfg.match.method.toUpperCase() : 'GET';

                if (configMethod !== currentMethod) continue;

                const isMatch = (currentUrl === configUrl) || (currentUrl.startsWith(configUrl + '/'));

                if (isMatch) {
                    return {
                        key: key, 
                        windowSeconds: parseInt(routeCfg.windowSeconds ?? rateConfig.default?.windowSeconds ?? defaults.windowSeconds, 10),
                        maxRequests: parseInt(routeCfg.maxRequests ?? rateConfig.default?.maxRequests ?? defaults.maxRequests, 10)
                    };
                }
            }
        }
    }

    const fallbackKey = `default:${currentUrl}`; 
    
    if (rateConfig && rateConfig.default) {
        return {
            key: fallbackKey,
            windowSeconds: parseInt(rateConfig.default.windowSeconds ?? defaults.windowSeconds, 10),
            maxRequests: parseInt(rateConfig.default.maxRequests ?? defaults.maxRequests, 10),
        };
    }

    return { key: fallbackKey, ...defaults };
}

// Middleware main
export async function rateLimiter(req, res, next) {
    try {
        const redis = RedisClient;
        if (!redis || !redis.isReady) {
            console.warn(chalk.yellow('RateLimiter: Redis not connected, skipping rate limiting.'));
            writeToLog('RateLimiter skip: redis not connected', 'rateLimiter');
            return next();
        }
        const { key: routeKey, windowSeconds, maxRequests } = getLimitsContext(req);
        const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown').toString();
        const redisKey = `rate:${routeKey}:${ip}`;
        const current = await redis.incr(redisKey);
        const isDefault = routeKey.startsWith('default:');
        const color = isDefault ? chalk.gray : chalk.cyan; 
        
        console.log(color(`[RateLimit] name=${routeKey} method=${req.method} count=${current}/${maxRequests} window=${windowSeconds}s`));
        writeToLog(`RateLimit name=${routeKey} method=${req.method} count=${current}/${maxRequests} window=${windowSeconds}s`, 'rateLimiter');

        if (current === 1) { await redis.expire(redisKey, windowSeconds);}
        if (current > maxRequests) {
            const ttl = await redis.ttl(redisKey);
            console.error(chalk.red(`[RateLimit] BLOCKED! key=${routeKey} count=${current}/${maxRequests} ip=${ip} retry_in=${ttl}s`));
            writeToLog(`RateLimit BLOCKED key=${routeKey} count=${current}/${maxRequests} ip=${ip} retry_in=${ttl}s`, 'rateLimiter');
            res.set('Retry-After', String(ttl > 0 ? ttl : windowSeconds));
            return res.status(429).json({ success: false, message: 'Too many requests, please retry later.', retryAfter: ttl });
        }

        const remaining = Math.max(0, maxRequests - current);
        res.set('X-RateLimit-Limit', String(maxRequests));
        res.set('X-RateLimit-Remaining', String(remaining));
        return next();
    } catch (err) {
        console.error(chalk.red('RateLimiter error:'), err.stack || err.message || err);
        writeToLog(`RateLimiter error: ${err.stack || err.message || err}`, 'rateLimiter');
        return next();
    }
}

export default rateLimiter;