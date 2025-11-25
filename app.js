import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
const packageInfo = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
import getConfig from 'config';
import { allowOnlyFromIPs } from './middleware/whiteList.js';

const apiRoot = '/api';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
const port = process.env.PORT || getConfig.port;
app.use(allowOnlyFromIPs);

//ROUTE
router.get('/', (req, res) => {
    const response = {
        name: packageInfo.name,
        version: packageInfo.version
    };
    res.json(response);
});

import sendmail from './func/sendmail.js';
router.post('/sendEmail', async(req, res)=>{
    const { to, subject, content } = req.body;

    if (!to || !subject || !content) {
        return res.status(400).json({ success: false, message: 'Please provide to, subject, and content in the request body.' });
    }

    try {
        const response = await sendmail(to, subject, content);
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while sending the email.' });
    }
});
app.use(apiRoot, router);
app.listen(port, () => {
    console.log(`api start at ${port}`);
});
