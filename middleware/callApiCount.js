import chalk from 'chalk';
import { incrementCounter } from '../func/Redis.js';
import REDIS_KEYS from '../constant/redisKey.js';
import { writeToLog } from './log.js';

/**
 * Middleware to increment the global API call counter.
 * Increments the Redis counter for each API request.
 * Logs errors but does not block the request if Redis fails.
 */
export const trackApiCall = async (req, res, next) => {
    try {
        const newVal = await incrementCounter(REDIS_KEYS.GLOBAL_STATUS);
    } catch (error) {
        console.error(chalk.red('Failed to increment API call counter:'), error.message);
    }
    next();
};