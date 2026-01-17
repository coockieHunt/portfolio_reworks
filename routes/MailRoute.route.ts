// express
import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';

// service
import sendmail from '../services/Sendmail.service'; 

// middlewares
import rateLimiter from '../middlewares/rateLimiter.middlewar';
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';



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
** POST /sendEmail
** Handles sending contact emails from the portfolio.
**  @param req Express Request object
**  @param res Express Response object
*/
mailRouter.post('/sendEmail', 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),
        body('message').notEmpty().withMessage('Message is required')
            .isLength({ max: 2000 }).withMessage('Message exceeds maximum length of 2000 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, email, subject, message } = req.body as MailRequestBody;

        const adminEmail = process.env.MAIL_USER;

        if (!adminEmail) {
            logConsole('POST', '/sendEmail', 'FAIL', 'MAIL_USER not defined in environment variables');
            console.error("[Email] ERROR: MAIL_USER is not defined in environment variables.");
            return res.error("Server configuration error.", 500);
        }

        if (typeof sendmail !== 'function') {
            logConsole('POST', '/sendEmail', 'FAIL', 'sendmail is not a function. Check imports.');
            console.error("[Email] CRITICAL ERROR: sendmail is not a function. Check imports.");
            return res.error("Internal code error (Import).", 500);
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

            logConsole('POST', '/sendEmail', 'OK', 'Email sent to admin', { to: adminEmail, from: email });

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
    }
);

export default mailRouter;