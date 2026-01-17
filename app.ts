import dotenv from 'dotenv';
dotenv.config({ 
    quiet: true 
});

import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import consola from 'consola';

import cfg from './config/default';
import { createClient } from 'redis';
import { RedisService } from './services/Redis.service';
import { SendmailService } from './services/Sendmail.service'; 

import { pingSqlite } from './utils/sqllite.helper';

import { trackApiCall } from './middlewares/callApiCount.middlewar';
import { allowOnlyFromIPs } from './middlewares/whiteList.middlewar';
import { responseHandler } from './middlewares/responseHandler.middlewar';
import { TestingMiddleware } from './middlewares/testing.middleware';

import mailRouter from './routes/MailRoute.route';
import guestBookRoute from './routes/GuestBook.route';
import counterRouter from './routes/Counteur.route';
import healthCheckRouter from './routes/healthCheck.route';
import BlogRoute from './routes/Blog.route';
import AuthRoute from './routes/Auth.route';
import TagRouter from './routes/Tags.route';

import assetsRoute from './routes/Assets.route';

import OpenGraphRouter from './routes/assets/OgImage.route.asset';
import AssetsProxyRoute from './routes/assets/AssetsProxy.route.asset';

const API_ROOT = cfg.ApiRoot ;
const ASSET_ROOT = cfg.AssetRoot ;

const app = express();
const PORT = cfg.port || 3000;

app.set('trust proxy', 1); //FIX PROXY NGNIX

// Initialisation Redis
const redisClient = createClient({
    password: cfg.redis.password,
    socket: {
        host: cfg.redis.host,
        port: cfg.redis.port,
        reconnectStrategy: (retries) => {
            if (retries > 3) { 
                return new Error("Redis connection failed after 3 attempts");
            }
            return 500; //retry att 
        }
    }
});

//load global middlewares
app.use(cors());
app.use(TestingMiddleware);
app.use(express.json()); 
app.use(trackApiCall); 
app.use(responseHandler);

// Routes
//allowOnlyFromIPs for ip restriction
app.use(`${API_ROOT}/mail`, allowOnlyFromIPs, mailRouter);
app.use(`${API_ROOT}/guestbook`, allowOnlyFromIPs, guestBookRoute);
app.use(`${API_ROOT}/blog`, allowOnlyFromIPs, BlogRoute);
app.use(`${API_ROOT}/auth`, allowOnlyFromIPs, AuthRoute);
app.use(`${API_ROOT}/counter`, counterRouter);
app.use(`${API_ROOT}/health`, healthCheckRouter);
app.use(`${API_ROOT}/tags`, allowOnlyFromIPs, TagRouter);
app.use(`${API_ROOT}/assets`, allowOnlyFromIPs, assetsRoute);

//asset
app.use(`${ASSET_ROOT}/opengraph`, allowOnlyFromIPs, OpenGraphRouter);
app.use(`${ASSET_ROOT}/images`, allowOnlyFromIPs, AssetsProxyRoute);


app.use((req, res, next) => {
    console.log(chalk.red(`[Routeur]`), "404 not found", chalk.gray(" → " + req.originalUrl));
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        requestedUrl: req.originalUrl
    });
});

// run
async function startServer() {
    if (cfg.fallback.latency || cfg.fallback.sendError) {
        consola.warn('🛑 FALLBACK SIMULATION is ENABLED');
    }

    console.log(cfg.fallback.latency)

    consola.info(chalk.bold('Configuration Loaded:'));
    console.log(`  ${chalk.blue('• API Root:')}   ${API_ROOT}`);
    console.log(`  ${chalk.blue('• Asset Root:')} ${ASSET_ROOT}`);
    console.log(`  ${chalk.blue('• Cache TTL:')}  ${cfg.blog.cache_ttl} seconds\n`);

    consola.start('Starting System Services...');

    try {
        pingSqlite();
        consola.success('SQLite Ready', chalk.dim(`(portfolio.db)`));

        await RedisService.connectRedis(redisClient as any);
        consola.success('Redis Ready', chalk.dim(`(${cfg.redis.host}:${cfg.redis.port})`));

        await SendmailService.verifySmtpConnection();
        consola.success('SMTP Ready', chalk.dim(`(${process.env.MAIL_HOST})`));

        app.listen(Number(PORT), '0.0.0.0', () => {
            consola.box({
                title: chalk.bold.green(' 🚀 SERVER READY '),
                message: `Server listening on port: ${chalk.cyan.bold(PORT)}\nhttp://0.0.0.0:${PORT}`,
                style: {
                    padding: 1,
                    borderColor: "green",
                    borderStyle: "round",
                },
            });
        });

    } catch (err: any) {
        consola.fatal('CRITICAL FAILURE DURING STARTUP');
        consola.error(err); 
        process.exit(1);
    }
}

startServer();