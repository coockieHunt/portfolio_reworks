// libraries
import express from 'express';
import { createClient } from 'redis';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cfg from './config/default.cjs';
import chalk from 'chalk';
import dotenv from 'dotenv';
// Load environment variables from .env if present
dotenv.config();
import { writeToLog } from './middleware/log.js';

// middleware
import { allowOnlyFromIPs } from './middleware/whiteList.js';
import { trackApiCall } from './middleware/callApiCount.js';
import { connectRedis } from './func/Redis.js';

// constants
import REDIS_KEYS from './constant/redisKey.js';

//get package info
const packageInfo = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
const apiRoot = cfg.ApiRoot;

//setup express end parssers
const app = express();
app.use(bodyParser.json());
app.use(cors());

const parseList = (val, fallback = []) => {
  if (!val || typeof val !== 'string') return fallback;
  return val
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
};


const ipList = parseList(process.env.IP_WHITELIST, ['::1']);
console.log('Parsed IP List:', ipList);

//setup router and port
const router = express.Router();
const port = process.env.PORT || cfg.port;

// Apply IP whitelist middleware
app.use(allowOnlyFromIPs);

// Track API calls
app.use(trackApiCall);

// Redis setup
const redisConfig = cfg.redis;
const client = createClient({
    socket: {
        host: process.env.REDIS_HOST || redisConfig.host,
        port: parseInt(process.env.REDIS_PORT || String(redisConfig.port), 10)
    },
    password: process.env.REDIS_PASSWORD || redisConfig.password || undefined
});

async function startServer() {
    const redisConnected = await connectRedis(client);
    if (!redisConnected) {
        console.error(chalk.red('Warning: Redis is not connected. Counter endpoints will return 503 until Redis is available.'));
        writeToLog('Startup: Redis not connected', 'status');
    }

    app.use(apiRoot, router);
    try { logStartupInfo(redisConnected); } catch (e) {};
    app.listen(port, () => {
        console.log(chalk.green(`api listening on ${port}`));
        writeToLog(`Startup: API listening on port ${port}`, 'status');
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

//import guestbook route
import guestBookRoute from './router/GuestBookRoute.js';
router.use('/guestbook', guestBookRoute);

//log startup info
function logStartupInfo(redisConnected) {
    console.log(chalk.blue('\nConfigured Redis counters:'));
    Object.keys(REDIS_KEYS).forEach(k => {
        console.log(` - ${k} => ${REDIS_KEYS[k]}`);
    });

    try {
        const rateCfg = cfg.rateLimiter || null;
        console.log(chalk.blue('\nRate limiter config:'));
        if (!rateCfg) {
            console.log(' - (no rateLimiter config found)');
        } else {
            const def = rateCfg.default || {};
            console.log(` - enabled: ${rateCfg.enabled !== false}`);
            console.log(` - default: ${def.maxRequests || '(unset)'} requests / ${def.windowSeconds || '(unset)'}s`);
            if (rateCfg.routes) {
                console.log(' - routes:');
                Object.keys(rateCfg.routes).forEach(rk => {
                    const r = rateCfg.routes[rk];
                    console.log(`    - ${rk}: ${r.maxRequests}/${r.windowSeconds}s`);
                });
            } else {
                console.log(' - routes: (none)');
            }
        }
    } catch (err) {
        console.warn(chalk.yellow('Could not read rateLimiter config for startup log'));
        writeToLog('Startup: could not read rateLimiter config', 'status');
    }

    console.log(chalk.green(`\nAPI start at ${port} (redisConnected=${redisConnected})`));
    writeToLog(`Startup: API started at port ${port} redisConnected=${redisConnected}`, 'status');
}
