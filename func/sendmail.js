import nodemailer from 'nodemailer';
import chalk from 'chalk';
import { writeToLog } from '../middleware/log.js';
import cfg from '../config/default.cjs';
import dotenv from 'dotenv';

dotenv.config(); 

const Mailer = cfg.MailTransport || {};
const mailHost = process.env.MAIL_HOST || Mailer.host;
const mailPort = parseInt(process.env.MAIL_PORT || String(Mailer.port || 587), 10);
const mailSecure = (process.env.MAIL_SECURE || String(Mailer.secure || false)).toLowerCase() === 'true';
const sender_email = process.env.MAIL_USER || Mailer.user;
const sender_pass = process.env.MAIL_PASS || Mailer.pass;

const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: {
        user: sender_email,
        pass: sender_pass,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error(chalk.red('❌ SMTP Error: Unable to connect to mail server.'));
        writeToLog(`SMTP Connection Error: ${error.message}`, 'error');
    } else {
        console.log(chalk.blue(`✅ SMTP Ready: Connected to ${mailHost}`));
    }
});

/**
 * Sends an email and handles logging via the internal system.
 * 
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} content - The HTML content of the email.
 * @returns {Promise<{success: boolean, message: string}>} The result of the operation.
 */
async function sendmail(to, subject, content) {
    try {
        const mailOptions = {
            from: sender_email,
            to: to,
            subject: subject,
            html: content, 
        };

        const info = await transporter.sendMail(mailOptions);

        const logMsg = `Email sent successfully to [${to}] - ID: ${info.messageId}`;
        writeToLog(logMsg, 'mail');

        console.log(chalk.green(`📧 Mail sent: ${to}`));

        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        const errorMsg = `Failed to send mail to [${to}] - Error: ${error.message}`;
        writeToLog(errorMsg, 'mail'); 

        console.error(chalk.red(`⚠️ Error sending mail to ${to}`));

        return { success: false, message: 'An error occurred while sending the email' };
    }
}

export default sendmail;