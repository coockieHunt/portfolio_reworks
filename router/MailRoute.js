import express from 'express';
const mailRouter = express.Router({ mergeParams: true });
import sendmail from '../func/sendmail.js';
import rateLimiter from '../middleware/rateLimiter.js';
import { writeToLog } from '../middleware/log.js';

mailRouter.use(rateLimiter);

 /**
    * POST /sendEmail
    * Sends an email using the provided recipient, subject, and content.
    *
    * @name POST/sendEmail
    * @function
    * @memberof module:MailRoute
    * @param {Object} req - Express request object.
    * @param {Object} req.body - Request body.
    * @param {string} req.body.to - Recipient email address.
    * @param {string} req.body.subject - Email subject.
    * @param {string} req.body.content - Email content.
    * @param {Object} res - Express response object.
    * @returns {Object} JSON response indicating success or failure.
    */
mailRouter.post('/sendEmail', async(req, res)=>{
    const { to, subject, content } = req.body;

    if (!to || !subject || !content) {
        writeToLog('MailRoute invalid body: missing to/subject/content', 'mail');
        return res.status(400).json({ success: false, message: 'Please provide to, subject, and content in the request body.' });
    }

    try {
        writeToLog(`MailRoute request to=${to} subject=${subject}`, 'mail');
        const response = await sendmail(to, subject, content);
        writeToLog(`MailRoute result success=${response.success}`, 'mail');
        return res.json(response);
    } catch (error) {
        writeToLog(`MailRoute error: ${error.stack || error.message || error}`, 'mail');
        return res.status(500).json({ success: false, message: 'An error occurred while sending the email.' });
    }
});


export default mailRouter;