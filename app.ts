import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import cfg from './config/default';
import { createClient } from 'redis';
import { connectRedis } from './services/Redis.service';
import { verifySmtpConnection } from './services/Sendmail.service'; 

import { pingSqlite } from './utils/sqllite.helper';

import { trackApiCall } from './middlewares/callApiCount.middlewar';
import { allowOnlyFromIPs } from './middlewares/whiteList.middlewar';
import { responseHandler } from './middlewares/responseHandler.middlewar';

import mailRouter from './routes/MailRoute.route';
import guestBookRoute from './routes/GuestBook.route';
import counterRouter from './routes/Counteur.route';
import healthCheckRouter from './routes/healthCheck.route';
import BlogRoute from './routes/Blog.route';
import AuthRoute from './routes/Auth.route';
import CloudinaryRoute from './routes/Cloudinary.route';

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
            return 500; //retry att 
        }
    }
});

//load global middlewares
app.use(cors());
app.use(express.json()); 
app.use(trackApiCall); 
app.use(responseHandler);

// Routes
//allowOnlyFromIPs for ip restriction
app.use(`${API_ROOT}/mail`, allowOnlyFromIPs, mailRouter);
app.use(`${API_ROOT}/guestbook`, allowOnlyFromIPs, guestBookRoute);
app.use(`${API_ROOT}/blog`, allowOnlyFromIPs, BlogRoute);
app.use(`${API_ROOT}/auth`, allowOnlyFromIPs, AuthRoute);
app.use(`${API_ROOT}/cloudinary`, allowOnlyFromIPs, CloudinaryRoute);
app.use(`${API_ROOT}/counter`, counterRouter);
app.use(`${API_ROOT}/health`, healthCheckRouter);

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
    const spacer = () => console.log(chalk.gray('─'.repeat(40)));

    console.log(
        chalk.cyan('🔧  API:'),
        chalk.gray(`\n  • ApiRoot: ${API_ROOT}\n`)
    );
    console.log(
        chalk.cyan('🖋️  BLOG:'),
        chalk.gray(`\n  • Cache TTL: ${cfg.blog.cache_ttl} seconds\n`)
    );

    spacer();
    console.log(chalk.bold.cyan('\n🏗️  Starting System...'));
    spacer();
    try {
        pingSqlite();
        console.log(`${chalk.green('✅ SQLite Ready')}: portfolio.db`);

        await connectRedis(redisClient as any);
        console.log(`${chalk.green('✅ Redis Ready')}:  ${cfg.redis.host}:${cfg.redis.port}`);

        await verifySmtpConnection();
        console.log(`${chalk.green('✅ SMTP Ready')}:   ${process.env.MAIL_HOST}`);

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