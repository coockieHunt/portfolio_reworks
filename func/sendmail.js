import nodemailer from 'nodemailer';
import chalk from 'chalk';
import { writeToLog } from '../middleware/log.js';
import getConfig from 'config';
import dotenv from 'dotenv';

dotenv.config();
const Mailer = getConfig.get('MailTransport');
const mailHost = process.env.MAIL_HOST || Mailer.host;
const mailPort = parseInt(process.env.MAIL_PORT || String(Mailer.port || 0), 10);
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


async function sendmail(to, subject, content) {
    try {
        writeToLog(`Mail SEND start to=${to} subject=${subject}`, 'mail');
        const mailOptions = {
            from: sender_email,
            to: to,
            subject: subject,
            text: content,
            headers: {
                'Content-Type': 'text/html; charset=UTF-8'
            },
        };

        await transporter.sendMail(mailOptions);

        const logMessage = `Email from ${sender_email} sent successfully \n    - to: ${to}, \n    - subject: ${subject}`;
        console.log(chalk.green(logMessage));
        writeToLog(logMessage, "mail");

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(chalk.red('An error occurred while sending the email:'));
        console.error(chalk.red(error.stack || error.message || error));
        writeToLog(`Mail SEND error: ${error.stack || error.message || error}`, 'mail');

        return { success: false, message: 'An error occurred while sending the email' };
    }
}

export default sendmail;
