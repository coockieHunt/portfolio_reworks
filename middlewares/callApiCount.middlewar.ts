// request
import { Request, Response, NextFunction } from 'express';

//color
import chalk from 'chalk';

//redis
import { incrementCounter } from '../services/Redis.service';
import REDIS_KEYS from '../constants/redis.constant';

/**
 * Middleware to increment the global API call counter.
 * Increments the Redis counter for each API request.
 * Logs errors but does not block the request if Redis fails.
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction
 */
export const trackApiCall = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        await incrementCounter(REDIS_KEYS.GLOBAL_STATUS);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(chalk.red('Failed to increment API call counter:'), error.message);
        } else {
            console.error(chalk.red('Failed to increment API call counter:'), error);
        }
    }
    next();
};