// request
import { Request, Response, NextFunction } from 'express';

// config
import config from '../config/default';

// log
import { logConsole, writeToLog } from './log.middlewar';

const allowedIPs = config.allowedIPs;

/**
 * Normalizes IP addresses for consistent comparison
 * 
 * Removes IPv6 prefix (::ffff:) and converts localhost variants.
 * Ensures IPv4 and IPv6 addresses are comparable.
 * 
 * @param ip - The IP address to normalize
 * @returns Normalized IP address string
 * @private
 */
const normalizeIP = (ip: string): string => {
    if (ip.startsWith('::ffff:')) {
        return ip.substring(7);
    }
    if (ip === '::1') {
        return '127.0.0.1';
    }
    return ip;
};

const normalizedAllowedIPs = allowedIPs.map((ip: string) => normalizeIP(ip));

/**
 * IP whitelist middleware
 * 
 * Restricts access to requests from whitelisted IP addresses only.
 * Returns 403 Forbidden for non-whitelisted IPs.
 * Configured via config.allowedIPs array.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const allowOnlyFromIPs = (req: Request, res: Response, next: NextFunction): void => {
    const clientIP: string = req.ip || 'unknown';
    const normalizedClientIP = normalizeIP(clientIP);

    if (normalizedAllowedIPs.includes(normalizedClientIP)) {
        logConsole('MIDDLEWARE', 'whiteList', 'OK', `Access granted`, { ip: clientIP , normalize: normalizedClientIP });
        writeToLog(`Whitelist allow ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        next();
    } else {
        logConsole('MIDDLEWARE', 'whiteList', 'FAIL', `Access denied`, { ip: clientIP, normalize: normalizedClientIP });
        writeToLog(`Whitelist deny ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        
        res.status(403).json({ 
            success: false, 
            message: 'Access denied from this IP address.' 
        });
    }
};