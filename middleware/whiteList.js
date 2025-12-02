import config from 'config';
import chalk from 'chalk';
const allowedIPs = config.get('allowedIPs');
import { writeToLog } from './log.js';

/**
 * Normalizes IP address by removing IPv6 prefix for IPv4-mapped addresses
 * @param {string} ip - The IP address to normalize
 * @returns {string} - Normalized IP address
 */
const normalizeIP = (ip) => {
    // Convert IPv4-mapped IPv6 (::ffff:127.0.0.1) to pure IPv4 (127.0.0.1)
    if (ip.startsWith('::ffff:')) {
        return ip.substring(7);
    }
    // Convert ::1 to 127.0.0.1 for consistency
    if (ip === '::1') {
        return '127.0.0.1';
    }
    return ip;
};

/**
 * Middleware for allowing requests only from specified IP addresses.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {function} next - The next middleware function.
 */
export const allowOnlyFromIPs = (req, res, next) => {
    const clientIP = req.ip;
    const normalizedClientIP = normalizeIP(clientIP);
    
    // Normalize allowed IPs for comparison
    const normalizedAllowedIPs = allowedIPs.map(ip => normalizeIP(ip));

    if (normalizedAllowedIPs.includes(normalizedClientIP)) {
        writeToLog(`Whitelist allow ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        next();
    } else {
        console.log(`Access denied from this IP address: ${chalk.red(clientIP)} (normalized: ${normalizedClientIP})`);
        writeToLog(`Whitelist deny ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        res.status(403).json({ success: false, message: 'Access denied from this IP address.' });
    }
};