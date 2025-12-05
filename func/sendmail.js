
import nodemailer from 'nodemailer';
import chalk from 'chalk';
import { writeToLog } from '../middleware/log.js';
import dotenv from 'dotenv';

dotenv.config(); 

const mailHost = process.env.MAIL_HOST;
const mailPort = parseInt(process.env.MAIL_PORT || '465', 10);
const mailSecure = (process.env.MAIL_SECURE === 'true');
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: { user: mailUser, pass: mailPass },
});

transporter.verify((error, success) => {
    if (error) {
        console.error(chalk.red('❌ SMTP Config Error:'), error.message);
    } else {
        console.log(chalk.blue(`✅ SMTP Ready: ${mailHost}`));
    }
});

/**
 * Sends an email using the configured SMTP transporter.
 *
 * @async
 * @function sendmail
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} content - The HTML content of the email.
 * @returns {Promise<{success: boolean, message?: string}>} An object indicating success or failure, and an error message if failed.
 */
const sendmail = async (to, subject, content) => {
    try {
        const mailOptions = {
            from: `"Portfolio" <${mailUser}>`,
            to: to,
            subject: subject,
            html: content, 
        };

        const info = await transporter.sendMail(mailOptions);
        
        writeToLog(`Email sent to [${to}] ID: ${info.messageId}`, 'mail');
        console.log(chalk.green(`📧 Mail sent: ${to}`));
        
        return { success: true };

    } catch (error) {
        console.error(chalk.red('❌ Sendmail Error:'), error.message);
        writeToLog(`Sendmail Error: ${error.message}`, 'mail');
        return { success: false, message: error.message };
    }
};

export default sendmail;