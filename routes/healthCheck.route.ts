// request
import express, { Request, Response, Router } from 'express';

//color
import chalk from 'chalk';

//middlewares
import { writeToLog } from '../middlewares/log.middlewar';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';

// system
import { uptime } from 'node:process';

// services
import { verifySmtpConnection } from '../services/Sendmail.service';
import { connectRedis } from '../services/Redis.service';
import { createClient } from 'redis';

// config
import cfg from '../config/default';
import pkg from '../package.json' with { type: 'json' };

const healthCheckRouter: Router = express.Router({ mergeParams: true });

const redisClient = createClient({
    password: cfg.redis.password,
    socket: {
        host: cfg.redis.host,
        port: cfg.redis.port,
        reconnectStrategy: (retries) => {
            if (retries > 3) { 
                return new Error("Redis connection failed after 3 attempts");
            }
            return 500; 
        }
    }
});

/**
* GET / - Health Check Route
* gets the health status of the API and its dependencies.
* @param req - Express Request object
* @param res - Express Response object
*/
healthCheckRouter.get('/', rateLimiter, async (req: Request, res: Response) => {
    writeToLog('Health Check route accessed', 'health');
    console.log(chalk.blue(`[GET /health] Health Check route accessed`));

    const healthStatus = {
        status: "ok",
        version: pkg.version,
        uptime: uptime(),
        service: {
            redis: "down",
            mail: "down"
        }
    };

    try {
        await connectRedis(redisClient as any);
        healthStatus.service.redis = 'UP';

        await verifySmtpConnection();
        healthStatus.service.mail = 'UP';

        res.success(healthStatus);

    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[Health Check Error]:`), errorMsg);
        writeToLog(`Health Check error: ${errorMsg}`, 'health');
        return res.error('Internal Server Error', 500);
    }
});

export default healthCheckRouter;