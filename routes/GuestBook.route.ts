// request
import express, { Request, Response, Router } from 'express';

// config
import cfg from '../config/default.ts';

// middlewares
import { rateLimiter } from '../middlewares/rateLimiter.middlewar.ts';

// services
import { getGuestBookEntries, addGuestBookEntry, GuestBookEntry } from '../services/GuestBook.service.ts';

//color
import chalk from 'chalk';

// log
import { writeToLog } from '../middlewares/log.middlewar.ts';

const guestBookRoute: Router = express.Router();
const secretConfig = cfg.SecretSystem;


/**
 * POST /read - Retrieve all guestbook entries
 * read the guestbook entries.
 * @param req - Express Request object
 * @param res - Express Response object
 */
guestBookRoute.post('/read', rateLimiter, async (req: Request, res: Response) => {
    try {
        const { password } = req.body; 

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red('[GET(POST) /guestbook] unauthorized access attempt'));
            writeToLog('GuestBookRoute READ unauthorized access attempt', 'secret');
            return res.status(401).error('Unauthorized', 401);
        }

        const guestBookResponse = await getGuestBookEntries();
        const entries: GuestBookEntry[] = guestBookResponse.entries;
        
        console.log(chalk.blue(`[GET(POST) /guestbook/] Retrieved guestbook entries count=${entries.length}`));
        writeToLog(`GuestBookRoute READ ok count=${entries.length}`, 'guestbook');
        
        return res.success({  count: guestBookResponse.count, entries});
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[GuestBook READ Error]:`), errorMsg);
        writeToLog(`GuestBookRoute READ error: ${errorMsg}`, 'guestbook');
        return res.error('Internal Server Error', 500);
    }
});

/**
 * POST /write - Add new entry
 * write entry to guestbook
 * @param req - Express Request object
 * @param res - Express Response object
 */
guestBookRoute.post('/write', rateLimiter, async (req: Request, res: Response) => {
    try {
        const { password, name, message } = req.body;

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red(`[POST /guestbook/] Unauthorized access attempt`));
            writeToLog('GuestBookRoute WRITE unauthorized access attempt', 'secret');
            
            return res.error('Unauthorized', 401);
        }

        if (!name || !message) {
            console.log(chalk.red(`[POST /guestbook/] Missing name or message in request body`));
            writeToLog('GuestBookRoute WRITE missing name/message', 'guestbook');
            return res.error('Name and message are required', 400);
        }

        if (message.length > 500) {    
            console.log(chalk.red(`[POST /guestbook/] Message length exceeds 500 characters`));
            writeToLog('GuestBookRoute WRITE message too long', 'guestbook');
            return res.error('Message length must not exceed 500 characters', 400);
        }

        if(name.length > 50) {
            console.log(chalk.red(`[POST /guestbook/] Name length exceeds 50 characters`));
            writeToLog('GuestBookRoute WRITE name too long', 'guestbook');
            return res.error('Name length must not exceed 50 characters', 400);
        }

        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]{2,}\.(com|net|org|fr|info|be)\b)/i;
        if (urlRegex.test(name) || urlRegex.test(message)) {
            const trigger = urlRegex.test(name) ? "name" : "message";
            console.log(chalk.red(`[POST /guestbook/] URL detected in ${trigger}`));
            writeToLog(`GuestBook WRITE validation failed: URL detected in ${trigger}`, 'guestbook');
            return res.error('url detected in input', 400);
        }

        const htmlRegex = /<[^>]*>/;
        if (htmlRegex.test(name) || htmlRegex.test(message)) {
            writeToLog('GuestBook WRITE validation failed: HTML tags detected', 'guestbook');
            return res.error('HTML tags detected in input', 400);
        }

        
        await addGuestBookEntry(name, message);
        
        console.log(chalk.magenta(`[POST /guestbook] Added new guestbook entry by=${name} messageLength=${message.length}`));
        writeToLog(`GuestBookRoute WRITE ok by=${name} len=${message.length}`, 'guestbook');
        
        return res.success({ message: 'Entry added successfully' });
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[GuestBook WRITE Error]:`), errorMsg);
        writeToLog(`GuestBookRoute WRITE error: ${errorMsg}`, 'guestbook');
        return res.error('Internal Server Error', 500);
    }
});

export default guestBookRoute;