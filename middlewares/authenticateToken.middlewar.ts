import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { AuthService } from '../services/Auth.service';

interface TokenPayload {
    userId: number;
    iat?: number;
    exp?: number;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const path = req.originalUrl || req.path;
    const method = req.method;

    const prefix = chalk.cyan('[AUTH]');

    if (!token) {
        console.log(`${prefix} ${chalk.red('FAIL')} No token provided → ${chalk.yellow(method)} ${path}`);
        return res.error('No token provided', 401);
    }

    try {
        const isRevoked = await AuthService.isTokenRevoked(token);
        if (isRevoked) {
            console.log(`${prefix} ${chalk.bgRed.white(' REVOKED ')} Access denied → ${chalk.yellow(method)} ${path}`);
            return res.error('Token revoked, please login again', 401);
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
            if (err) {
                console.log(`${prefix} ${chalk.red('ERROR')} Invalid/Expired token → ${chalk.yellow(method)} ${path}`);
                return res.error('Invalid or expired token', 403);
            }

            console.log(`${prefix} ${chalk.green('OK')} Token verified → ${chalk.white(method)} ${chalk.gray(path)}`);
            
            req.user = user as TokenPayload;
            next();
        });

    } catch (error) {
        console.log(`${prefix} ${chalk.magenta('CRITICAL')} Redis/Auth Error →`, error);
        return res.error('Internal server error', 500);
    }
}