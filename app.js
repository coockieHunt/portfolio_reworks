// libraries
import express from 'express';
import { createClient } from 'redis';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import getConfig from 'config';
import chalk from 'chalk';

// middleware
import { allowOnlyFromIPs } from './middleware/whiteList.js';
import { trackApiCall } from './middleware/callApiCount.js';
import { connectRedis } from './func/Redis.js';

// constants
import REDIS_KEYS from './constant/redisKey.js';

//get package info
const packageInfo = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
const apiRoot = getConfig.get('ApiRoot');

//setup express end parssers
const app = express();
app.use(bodyParser.json());
app.use(cors());

//setup router and port
const router = express.Router();
const port = process.env.PORT || getConfig.get('port');

// Apply IP whitelist middleware
app.use(allowOnlyFromIPs);

// Track API calls
app.use(trackApiCall);

// Redis setup
const redisConfig = getConfig.get('redis');
const client = createClient({
    socket: {
        host: redisConfig.host,
        port: redisConfig.port
    }
});

async function startServer() {
    const redisConnected = await connectRedis(client);
    if (!redisConnected) {
        console.error(chalk.red('Warning: Redis is not connected. Counter endpoints will return 503 until Redis is available.'));
    }

    app.use(apiRoot, router);
    try { logStartupInfo(redisConnected); } catch (e) {};
    app.listen(port, () => {
        console.log(chalk.green(`api listening on ${port}`));
    });
}
startServer();

//Routes

//default route
router.get('/', (req, res) => {
    const response = {
        name: packageInfo.name,
        version: packageInfo.version
    };
    res.json(response);
});

//import routes counter
import counterRoute from './router/CounteurRoute.js';
router.use('/counter', counterRoute);

//import routes mail
import mailRoute from './router/MailRoute.js';
router.use('/mail', mailRoute);

//import status route
import statusRoute from './router/StatusRoute.js';
router.use('/status', statusRoute);

//log startup info
function logStartupInfo(redisConnected) {
    console.log(chalk.blue('\nConfigured Redis counters:'));
    Object.keys(REDIS_KEYS).forEach(k => {
        console.log(` - ${k} => ${REDIS_KEYS[k]}`);
    });

    try {
        const cfg = getConfig.has('rateLimiter') ? getConfig.get('rateLimiter') : null;
        console.log(chalk.blue('\nRate limiter config:'));
        if (!cfg) {
            console.log(' - (no rateLimiter config found)');
        } else {
            const def = cfg.default || {};
            console.log(` - enabled: ${cfg.enabled !== false}`);
            console.log(` - default: ${def.maxRequests || '(unset)'} requests / ${def.windowSeconds || '(unset)'}s`);
            if (cfg.routes) {
                console.log(' - routes:');
                Object.keys(cfg.routes).forEach(rk => {
                    const r = cfg.routes[rk];
                    console.log(`    - ${rk}: ${r.maxRequests}/${r.windowSeconds}s`);
                });
            } else {
                console.log(' - routes: (none)');
            }
        }
    } catch (err) {
        console.warn(chalk.yellow('Could not read rateLimiter config for startup log'));
    }

    console.log(chalk.green(`\nAPI start at ${port} (redisConnected=${redisConnected})`));
}




// server started in startServer()
