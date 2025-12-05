
import express from 'express';
import sendmail from '../func/sendmail.js'; 
import rateLimiter from '../middleware/rateLimiter.js';
import { writeToLog } from '../middleware/log.js';
import dotenv from 'dotenv';

dotenv.config();

const mailRouter = express.Router({ mergeParams: true });

mailRouter.use(rateLimiter);
/**
 * Express router for handling mail-related routes.
 * 
 * @module MailRoute
 * 
 * @requires express
 * @requires ../func/sendmail.js
 * @requires ../middleware/rateLimiter.js
 * @requires ../middleware/log.js
 * @requires dotenv
 * 
 * @description
 * Defines the /sendEmail POST route for sending emails via the sendmail function.
 * Applies rate limiting middleware and logs errors.
 * 
 * @route POST /sendEmail
 * @param {string} req.body.name - Name of the sender (required)
 * @param {string} req.body.email - Email address of the sender (required)
 * @param {string} req.body.subject - Subject of the email (optional)
 * @param {string} req.body.message - Message content (required)
 * 
 * @returns {Object} 200 - { success: true, message: 'send' }
 * @returns {Object} 400 - { success: false, message: 'Missing fields.' }
 * @returns {Object} 500 - { success: false, message: 'Server error.' }
 * 
 * @throws {Error} If sendmail is not a function or if sending fails.
 */
mailRouter.post('/sendEmail', async(req, res) => {
    console.log("👉 Route /sendEmail caled"); 

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing fields.' });
    }

    const adminEmail = process.env.MAIL_USER;

    if (typeof sendmail !== 'function') {
        console.error("❌ CRITICAL ERROR: sendmail is not a function. Check imports.");
        return res.status(500).json({ success: false, message: "Internal code error (Import)." });
    }

    try {
        const adminSubject = `[Portfolio] Contact de ${name}`;
        const adminContent = `
            <h3>Nouveau Message</h3>
            <p><strong>De:</strong> ${name} (${email})</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <hr/>
            <p>${message}</p>
        `;

        
        const result = await sendmail(adminEmail, adminSubject, adminContent);

        console.log("📨 Result sendmail:", result);

        if (!result || !result.success) {
            throw new Error(result ? result.message : 'sendmail returned no result');
        }

        return res.json({ success: true, message: 'send' });

    } catch (error) {
        console.error("❌ Exception dans MailRoute:", error);
        writeToLog(`MailRoute Exception: ${error.message}`, 'mail');
        return res.status(500).json({ success: false, message: "Server error." });
    }
});

export default mailRouter;