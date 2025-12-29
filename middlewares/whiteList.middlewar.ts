// request
import { Request, Response, NextFunction } from 'express';

// config
import config from '../config/default';

// log
import { logConsole, writeToLog } from './log.middlewar';

const allowedIPs = config.allowedIPs;

/**
** Helper to normalize IP addresses for comparison
*  @param ip - The IP address to normalize
*  @returns The normalized IP address
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
 ** Middleware to allow access only from whitelisted IP addresses
 *  @param req Express Request object
 *  @param res Express Response object
 *  @param next Express NextFunction
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