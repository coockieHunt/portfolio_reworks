// request
import { Request, Response, NextFunction } from 'express';

//redis
import { incrementCounter } from '../services/Redis.service';
import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant';

//middleware
import { logConsole } from './log.middlewar';

/**
 * * Middleware to increment the global API call counter.
 * * Increments the Redis counter for each API request.
 * * Logs errors but does not block the request if Redis fails.
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
        await incrementCounter(AUTHORIZED_REDIS_KEYS.GLOBAL_STATUS);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logConsole('MIDDLEWARE', 'trackApiCall', 'FAIL', 'Failed to increment API call counter', { error: error.message });
        } else {
            logConsole('MIDDLEWARE', 'trackApiCall', 'FAIL', 'Failed to increment API call counter', { error: String(error) });
        }
    }
    next();
};