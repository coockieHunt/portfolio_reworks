import express from 'express';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import cfg from '../config/default.cjs';
import { RedisClient } from '../func/Redis.js';
import { writeToLog } from '../middleware/log.js';

const statusRoute = express.Router({ mergeParams: true });
const packageInfo = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));

//Health Check Route
statusRoute.get('/', async (req, res) => {
    const statusResponse = {
        api: "ok",
        version: packageInfo.version,
        time: new Date().toISOString(),
        service: {
            redis: "nok",
            mail: "wip"
        },
        rateLimiter: {
            enabled: false,
            default: {},
            routes: {}
        }
    };

    // Get rate limiter config
    try {
        const rateLimiterConfig = cfg.rateLimiter || null;
        if (rateLimiterConfig) {
            statusResponse.rateLimiter.enabled = rateLimiterConfig.enabled !== false;
            statusResponse.rateLimiter.default = rateLimiterConfig.default || {};
            statusResponse.rateLimiter.routes = rateLimiterConfig.routes || {};
        }
    } catch (err) {
        // Ignore config errors
    }

    try {
        const client = RedisClient;
        if (!client || !client.isReady) {
            statusResponse.service.redis = 'down';
            writeToLog('Status health: redis down', 'status');
            return res.status(503).json(statusResponse);
        }
        
        const redisPing = await client.ping();
        if (redisPing === 'PONG') {
            statusResponse.service.redis = "ok";
            writeToLog('Status health: redis ok', 'status');
            return res.status(200).json(statusResponse);
        } else {
            statusResponse.service.redis = "nok";
            writeToLog('Status health: redis nok', 'status');
            return res.status(503).json(statusResponse);
        }
    } catch (error) {
        statusResponse.service.redis = 'down';
        console.error(chalk.red(`Health Check: Redis connection error: ${error.message}`));
        writeToLog(`Status health error: ${error.stack || error.message || error}`, 'status');
        return res.status(503).json(statusResponse);
    }
});

export default statusRoute;