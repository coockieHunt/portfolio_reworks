//mailer
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

// middlewares
import { logConsole, writeToLog } from '../middlewares/log.middlewar'; 

// system
import dotenv from 'dotenv';
dotenv.config(
    { quiet: true }
);

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
 * Sendmail Service
 * 
 * Handles email sending through SMTP with Nodemailer.
 * Manages SMTP connection verification and email delivery.
 * Provides error handling and logging for email operations.
 */
export class SendmailService {
    /**
     * Verifies the SMTP server connection
     * @returns Promise resolving to true if connection is successful
     * @throws {Error} If SMTP connection fails
     */
    static async verifySmtpConnection(): Promise<boolean> {
        try {
            await transporter.verify();
            return true;
        } catch (error: any) {
            throw new Error(`SMTP Connection failed: ${error.message}`);
        }
    };

    /**
     * Sends an email via SMTP
     * @param to - Recipient email address
     * @param subject - Email subject line
     * @param content - HTML email content
     * @returns Promise with success status and optional error message
     */
    static async sendmail(to: string, subject: string, content: string): Promise<SendMailResponse> {
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
            logConsole('POST', '/sendmail/', 'FAIL', 'Error sending email', { error: errorMsg });
            writeToLog(`Sendmail Error: ${errorMsg}`, 'mail');
            return { success: false, message: errorMsg };
        }
    }
}

export default SendmailService.sendmail;