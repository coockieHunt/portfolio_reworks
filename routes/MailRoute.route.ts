// request
import express, { Request, Response, Router } from 'express';

// service
import sendmail from '../services/Sendmail.service'; 

// middlewares
import rateLimiter from '../middlewares/rateLimiter.middlewar';
import { writeToLog } from '../middlewares/log.middlewar';

// syteme
import dotenv from 'dotenv';

// color
import chalk from 'chalk';

dotenv.config();

const mailRouter: Router = express.Router({ mergeParams: true });

mailRouter.use(rateLimiter);

//type
interface MailRequestBody {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

/**
* POST /sendEmail
* Handles sending contact emails from the portfolio.
* @param req - Express Request object
* @param res - Express Response object
*/
mailRouter.post('/sendEmail', async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body as MailRequestBody;
    if (!name || !email || !message) { return res.error('Missing fields.', 400);}

    const adminEmail = process.env.MAIL_USER;

    if (!adminEmail) {
        console.error("[Email] ERROR: MAIL_USER is not defined in environment variables.");
        return res.error("Server configuration error.", 500);
    }

    if (typeof sendmail !== 'function') {
        console.error("[Email] CRITICAL ERROR: sendmail is not a function. Check imports.");
        return res.error("Internal code error (Import).", 500);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error("[Email] Invalid email format:", email);
        return res.error("Invalid email format.", 400);
    }

    if (message.length > 2000) {
        console.error("[Email] Message too long:", message.length);
        return res.error("Message exceeds maximum length of 2000 characters.", 400);
    }

    try {
        const adminSubject = `[Portfolio] Contact de ${name}`;
        const adminContent = `
            <h3>Nouveau Message</h3>
            <p><strong>De:</strong> ${name} (${email})</p>
            <p><strong>Sujet:</strong> ${subject || 'Sans sujet'}</p>
            <hr/>
            <p>${message}</p>
        `;

        const result = await sendmail(adminEmail, adminSubject, adminContent);

        console.log(chalk.blue(`[POST /sendEmail] Email sent to admin: ${adminEmail}`));

        if (!result || !result.success) {throw new Error(result?.message || 'sendmail returned no result');}

        return res.success({ 
            info: 'Email sent successfully to admin.', 
            to: adminEmail,
            body: req.body
        });

    } catch (error: any) {
        const errorMsg = error.message || String(error);
        console.error("[Email] Exception in MailRoute:", error);
        writeToLog(`MailRoute Exception: ${errorMsg}`, 'mail');
        
        return res.error("Server error.", 500);
    }
});

export default mailRouter;