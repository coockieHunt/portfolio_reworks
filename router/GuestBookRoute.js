import express from 'express';
import getConfig from 'config';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { getGuestBookEntries, addGuestBookEntry } from '../func/GuestBook.js';
import chalk from 'chalk';

const guestBookRoute = express.Router();
const secretConfig = getConfig.get('SecretSystem');

guestBookRoute.use(express.json());

// GET - Retrieve all guestbook entries
guestBookRoute.get('/', rateLimiter, async (req, res) => {
    try {
        const { password } = req.body; 

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red('[GET /guestbook] access attempt'));
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const entries = await getGuestBookEntries();
        console.log(chalk.blue(`[GET /guestbook/]  Retrieved guestbook entries count=${entries.length}`));
        res.json({ success: true, entries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// POST - Add new entry
guestBookRoute.post('/', rateLimiter, async (req, res) => {
    try {
        const { password, name, message } = req.body;

        if (!password || password !== secretConfig.password) {
            console.log(chalk.red(`[POST /guestbook/] Unauthorized access attempt`));
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!name || !message) {
            console.log(chalk.red(`[POST /guestbook/] Missing name or message in request body`));
            return res.status(400).json({ success: false, message: 'Name and message are required' });
        }

        if (message.length > 500) {    
            console.log(chalk.red(`[POST /guestbook/] Message length exceeds 500 characters`));
            return res.status(400).json({ success: false, message: 'Message length must not exceed 500 characters' });
        }

        await addGuestBookEntry(name, message);
        console.log(chalk.magenta(`[POST /guestbook] Added new guestbook entry by=${name} messageLength=${message.length}`));
        res.json({ success: true, message: 'Entry added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default guestBookRoute;
