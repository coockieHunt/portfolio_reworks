import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { createClient } from 'redis';

import cfg from './config/default';

import { connectRedis } from './services/Redis.service';
import { verifySmtpConnection } from './services/Sendmail.service'; 

import { trackApiCall } from './middlewares/callApiCount.middlewar';
import { allowOnlyFromIPs } from './middlewares/whiteList.middlewar';
import { responseHandler } from './middlewares/responseHandler.middlewar';

import mailRouter from './routes/MailRoute.route';
import guestBookRoute from './routes/GuestBook.route';
import counterRouter from './routes/Counteur.route';
import healthCheckRouter from './routes/healthCheck.route';


dotenv.config();

const API_ROOT = cfg.ApiRoot ;

const app = express();
const PORT = cfg.port || 3000;

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
            return 500; //retry
        }
    }
});

//load global middlewares
app.use(cors());
app.use(express.json()); 
app.use(trackApiCall); 
app.use(responseHandler);

// Routes
app.use(`${API_ROOT}/mail`, allowOnlyFromIPs, mailRouter);
app.use(`${API_ROOT}/guestbook`, guestBookRoute);
app.use(`${API_ROOT}/counter`, counterRouter);
app.use(`${API_ROOT}/health`, healthCheckRouter);

// run
async function startServer() {
    console.log(chalk.bold.cyan('\n🏗️  Starting System...'));
    console.log(chalk.gray('─'.repeat(40)));

    try {
        await connectRedis(redisClient as any);
        console.log(`${chalk.green('✅ Redis Ready')} : ${cfg.redis.host}:${cfg.redis.port}`);

        await verifySmtpConnection();
        console.log(`${chalk.green('✅ SMTP Ready')}  : ${process.env.MAIL_HOST}`);

        app.listen(PORT, () => {
            console.log(chalk.gray('─'.repeat(40)));
            console.log(chalk.bold.bgGreen.black(` 🚀 SERVER READY `) + chalk.green(` on port ${PORT}`));
            console.log(chalk.gray('─'.repeat(40)) + '\n');
        });

    } catch (err: any) {
        console.log(chalk.gray('─'.repeat(40)));
        console.error(chalk.bold.red("❌ CRITICAL FAILURE DURING STARTUP"));
        console.error(chalk.red(`Reason: ${err.message}`));
        console.log(chalk.gray('─'.repeat(40)) + '\n');
        
        process.exit(1); 
    }
}

startServer();