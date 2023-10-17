const nodemailer = require('nodemailer');
const chalk = require('chalk');
const { writeToLog } = require('../middleware/log');

const getConfig = require('config');

const Mailer = getConfig.get("MailTransport");
const sender_email = Mailer.user;

const transporter = nodemailer.createTransport({
    host: Mailer.host,
    port: Mailer.port,
    secure: Mailer.secure,
    auth: {
        user: sender_email,
        pass: Mailer.pass,
    },
});

async function sendmail(to, subject, content) {
    try {
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
        console.error(error);

        return { success: false, message: 'An error occurred while sending the email' };
    }
}

module.exports = sendmail;
