// request
import { Request, Response, NextFunction } from 'express';

//redis
import { RedisService } from '../services/Redis.service';
import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant';

//middleware
import { logConsole } from './log.middlewar';

/**
 * API call tracking middleware
 * 
 * Increments a global counter in Redis for each API request.
 * Non-blocking - errors are logged but don't prevent request processing.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Promise that resolves after tracking attempt
 */
export const trackApiCall = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        await RedisService.incrementCounter(AUTHORIZED_REDIS_KEYS.GLOBAL_STATUS);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logConsole('MIDDLEWARE', 'trackApiCall', 'WARN', 'Failed to increment API call counter', { error: error.message });
        } else {
            logConsole('MIDDLEWARE', 'trackApiCall', 'WARN', 'Failed to increment API call counter', { error: String(error) });
        }
    }
    next();
};