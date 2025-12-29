// express
import express, { Request, Response, Router } from 'express';

//middlewares
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';

// system
import { uptime } from 'node:process';

// services
import { verifySmtpConnection } from '../services/Sendmail.service';
import { RedisClient } from '../services/Redis.service';

//helpers
import { pingSqlite } from '../utils/sqllite.helper';

// config
import cfg from '../config/default';
import pkg from '../package.json' with { type: 'json' };


const healthCheckRouter: Router = express.Router({ mergeParams: true });


/**
** GET / - Health Check Route
** gets the health status of the API and its dependencies.
*  @param req Express Request object
*  @param res Express Response object
*/
healthCheckRouter.get('/', rateLimiter, async (req: Request, res: Response) => {
    writeToLog('Health Check route accessed', 'health');
    logConsole('GET', '/health', 'OK', 'Health Check route accessed');

    const healthStatus = {
        status: "ok",
        version: pkg.version,
        uptime: uptime(),
        service: {
            redis: "down",
            mail: "down",
            sqlite: "down"
        }
    };

    try {
        pingSqlite();
        healthStatus.service.sqlite = 'UP';

        if (!RedisClient || !RedisClient.isReady) {
             throw new Error("Redis client not ready");
        }
        await RedisClient.ping();
        healthStatus.service.redis = 'UP';

        await verifySmtpConnection();
        healthStatus.service.mail = 'UP';

        res.success(healthStatus);

    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        logConsole('GET', '/health', 'FAIL', 'Health check failed', { error: errorMsg });
        writeToLog(`Health Check error: ${errorMsg}`, 'health');
        return res.error('Internal Server Error', 500);
    }
});

export default healthCheckRouter;