import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import getConfig from 'config';
import { allowOnlyFromIPs } from './middleware/whiteList.js';
import { createClient } from 'redis';
import { connectRedis } from './func/Redis.js';
import sendmail from './func/sendmail.js';
import chalk from 'chalk';


const packageInfo = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
const apiRoot = '/api';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
const port = process.env.PORT || getConfig.port;
app.use(allowOnlyFromIPs);

const redisConfig = getConfig.redis;
const client = createClient({
    socket: {
        host: redisConfig.host,
        port: redisConfig.port
    }
});

// Ensure redis connects before or during server start so endpoints are aware
async function startServer() {
    const redisConnected = await connectRedis(client);
    if (!redisConnected) {
        console.error(chalk.red('Warning: Redis is not connected. Counter endpoints will return 503 until Redis is available.'));
    }

    app.use(apiRoot, router);
    app.listen(port, () => {
        console.log(chalk.green(`api start at ${port} (redisConnected=${redisConnected})`));
    });
}

startServer();

//route
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

import mailRoute from './router/MailRoute.js';
router.use('/mail', mailRoute);


//Health Check Route
router.get('/status', async (req, res) => {
    const statusResponse = {
        api: "ok",
        version: packageInfo.version,
        time: new Date().toISOString(),
        service: {
            redis: "nok",
            mail: "wip"
        }
    };

    try {
        const redisPing = await client.ping();
        if (redisPing === 'PONG') {
            statusResponse.service.redis = "ok";
            return res.status(200).json(statusResponse);
        }else{
            statusResponse.redis = "nok";
            return res.status(503).json(statusResponse);
        }
    } catch (error) {
        statusResponse.service.redis = 'down';
        console.error(chalk.red(`Health Check: Redis connection error: ${error.message}`));
        return res.status(503).json(statusResponse);
    }
});

// server started in startServer()
