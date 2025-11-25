import config from 'config';
import chalk from 'chalk';
const allowedIPs = config.get('allowedIPs');

/**
 * Middleware for allowing requests only from specified IP addresses.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {function} next - The next middleware function.
 */

export const allowOnlyFromIPs = (req, res, next) => {
    const clientIP = req.ip;

    if (allowedIPs.includes(clientIP)) {
        next();
    } else {
        console.log(`Access denied from this IP address: ${chalk.red(clientIP)}`);
        res.status(403).json({ success: false, message: 'Access denied from this IP address.' });
    }
};

