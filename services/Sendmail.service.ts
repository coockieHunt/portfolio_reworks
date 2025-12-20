// lib
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

// color
import chalk from 'chalk';

// middlewares
import { writeToLog } from '../middlewares/log.middlewar'; 

// system
import dotenv from 'dotenv';

dotenv.config();

const mailHost = process.env.MAIL_HOST;
const mailPort = parseInt(process.env.MAIL_PORT || '465', 10);
const mailSecure = process.env.MAIL_SECURE === 'true';
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

interface SendMailResponse {
    success: boolean;
    message?: string;
}

const transporter: Transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: { user: mailUser, pass: mailPass },
});

/**
 * checks the SMTP connection by verifying the transporter.
 * @returns null if successful, throws an error if verification fails.
 */
export const verifySmtpConnection = async () => {
    try {
        await transporter.verify();
        return true;
    } catch (error: any) {
        throw new Error(`SMTP Connection failed: ${error.message}`);
    }
};

/**
 * Sends an email using the configured SMTP transporter.
 * @param to - Recipient email address.
 * @param subject - Subject of the email.
 * @param content - HTML content of the email.
 * @returns An object indicating success or failure, with an optional message.
 */
const sendmail = async (to: string, subject: string, content: string): Promise<SendMailResponse> => {
    try {
        const mailOptions: SendMailOptions = {
            from: `"Portfolio" <${mailUser}>`,
            to: to,
            subject: subject,
            html: content,
        };

        const info = await transporter.sendMail(mailOptions);

        writeToLog(`Email sent to [${to}] ID: ${info.messageId}`, 'mail');
        return { success: true };
    } catch (error: any) {
        const errorMsg = error.message || String(error);
        console.error(chalk.red('❌ Sendmail Error:'), errorMsg);
        writeToLog(`Sendmail Error: ${errorMsg}`, 'mail');
        return { success: false, message: errorMsg };
    }
};

export default sendmail;