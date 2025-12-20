// request
import { Request, Response, NextFunction } from 'express';

// config
import config from 'config';

//color
import chalk from 'chalk';

// log
import { writeToLog } from './log.middlewar';

const allowedIPs = config.get<string[]>('allowedIPs');

/**
 * Normalizes IP address by removing IPv6 prefix for IPv4-mapped addresses
 * @param ip - The IP address to normalize
 * @returns - Normalized IP address
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

/**
 * Middleware for allowing requests only from specified IP addresses.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction   
 */
export const allowOnlyFromIPs = (req: Request, res: Response, next: NextFunction): void => {
    const clientIP: string = req.ip || 'unknown';
    const normalizedClientIP = normalizeIP(clientIP);
    
    const normalizedAllowedIPs = allowedIPs.map((ip: string) => normalizeIP(ip));

    if (normalizedAllowedIPs.includes(normalizedClientIP)) {
        writeToLog(`Whitelist allow ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        next();
    } else {
        console.log(`Access denied from this IP address: ${chalk.red(clientIP)} (normalized: ${normalizedClientIP})`);
        writeToLog(`Whitelist deny ip=${clientIP} (normalized: ${normalizedClientIP})`, 'whitelist');
        
        res.status(403).json({ 
            success: false, 
            message: 'Access denied from this IP address.' 
        });
    }
};