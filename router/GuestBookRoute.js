import express from 'express';
import cfg from '../config/default.cjs';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { getGuestBookEntries, addGuestBookEntry } from '../func/GuestBook.js';
import chalk from 'chalk';
import { writeToLog } from '../middleware/log.js';

const guestBookRoute = express.Router();
const secretConfig = cfg.SecretSystem;

guestBookRoute.use(express.json());

// GET - Retrieve all guestbook entries
guestBookRoute.post('/read', rateLimiter, async (req, res) => {
    try {
        const { password } = req.body; 

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red('[GET(POST) /guestbook] access attempt'));
            writeToLog('GuestBookRoute READ unauthorized access attempt', 'secret');
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const entries = await getGuestBookEntries();
        console.log(chalk.blue(`[GET(POST) /guestbook/]  Retrieved guestbook entries count=${entries.length}`));
        writeToLog(`GuestBookRoute READ ok count=${entries.length}`, 'guestbook');
        res.json({ success: true, entries });
    } catch (error) {
        console.error(error);
        writeToLog(`GuestBookRoute READ error: ${error.stack || error.message || error}`, 'guestbook');
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// POST - Add new entry
guestBookRoute.post('/write', rateLimiter, async (req, res) => {
    try {
        const { password, name, message } = req.body;

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red(`[POST /guestbook/] Unauthorized access attempt`));
            writeToLog('GuestBookRoute WRITE unauthorized access attempt', 'secret');
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!name || !message) {
            console.log(chalk.red(`[POST /guestbook/] Missing name or message in request body`));
            writeToLog('GuestBookRoute WRITE missing name/message', 'guestbook');
            return res.status(400).json({ success: false, message: 'Name and message are required' });
        }

        if (message.length > 500) {    
            console.log(chalk.red(`[POST /guestbook/] Message length exceeds 500 characters`));
            writeToLog('GuestBookRoute WRITE message too long', 'guestbook');
            return res.status(400).json({ success: false, message: 'Message length must not exceed 500 characters' });
        }

        await addGuestBookEntry(name, message);
        console.log(chalk.magenta(`[POST /guestbook] Added new guestbook entry by=${name} messageLength=${message.length}`));
        writeToLog(`GuestBookRoute WRITE ok by=${name} len=${message.length}`,'guestbook');
        res.json({ success: true, message: 'Entry added successfully' });
    } catch (error) {
        console.error(error);
        writeToLog(`GuestBookRoute WRITE error: ${error.stack || error.message || error}`, 'guestbook');
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default guestBookRoute;
