// request
import express, { Request, Response, Router } from 'express';

//color
import chalk from 'chalk';

// log
import { writeToLog } from '../middlewares/log.middlewar';

import { 
    getCounter, 
    setCounter, 
    incrementCounter, 
    RedisClient 
} from '../services/Redis.service'; 
import REDIS_KEYS from '../constants/redis.constant'; 

import { rateLimiter } from '../middlewares/rateLimiter.middlewar';

const counterRouter: Router = express.Router({ mergeParams: true });

/**
 * Validates the provided name against REDIS_KEYS and returns the actual Redis key string.
 * @param name - The user-provided key name (e.g., "GLOBAL_STATUS").
 * @returns The Redis key string or null if invalid.
 */
function getValidatedRedisKey(name: string | undefined): string | null {
    if (!name || typeof name !== 'string' || name.trim() === '') { 
        return null; 
    }
    
    const upperName = name.toUpperCase() as keyof typeof REDIS_KEYS;
    const key = REDIS_KEYS[upperName];
    
    return key || null; 
}

/**
 * GET /get/:name get value of counter
 * Retrieves the counter value. Creates and initializes to 0 if non-existent.
 * @param req - Express Request object
 * @param res - Express Response object
 */
counterRouter.get('/get/:name', rateLimiter, async (req: Request, res: Response) => {
    const { name } = req.params; 
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        writeToLog(`Counter GET invalid name=${name}`, 'counter');

        return res.error('Counter name is required and must be valid.', 400);
    }

    try {
        const { value, exist } = await getCounter(redisKey); 
        console.log(chalk.blue(`[GET /get/${name}] redisKey=${redisKey} value=${value} exist=${exist}`));
        writeToLog(`Counter GET name=${name} key=${redisKey} value=${value} exist=${exist}`, 'counter');

        return res.success({ 
            counterName: name, 
            redisKey: redisKey, 
            counterValue: value,
            exist: exist
        });


    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[GET /get/${name}] Error:`), chalk.red(errorMsg));
        writeToLog(`Counter GET error name=${name}: ${errorMsg}`, 'counter');
        return res.error('An error occurred while getting the counter value.', 500, errorMsg);
    }
});

/**
 * POST /set/:name
 * Sets the counter value. Restricted to keys in REDIS_KEYS.
 * @param req - Express Request object
 * @param res - Express Response object
 */
counterRouter.post('/set/:name', rateLimiter, async (req: Request, res: Response) => {
    const { name } = req.params;
    const { value } = req.body;
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        writeToLog(`Counter SET invalid name=${name}`, 'counter');
        return res.error('Counter name is required and must be valid.', 400);
    }

    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
        writeToLog(`Counter SET non-numeric value name=${name} value=${value}`, 'counter');
        return res.error('A valid numeric value is required in the request body.', 400);
    }

    try {
        await setCounter(redisKey, numericValue);
        console.log(chalk.yellow(`[POST /set/${name}] redisKey=${redisKey} set to ${numericValue}`));
        writeToLog(`Counter SET name=${name} key=${redisKey} value=${numericValue}`, 'counter');
        return res.success({ 
            counterName: name,
            redisKey: redisKey,
            message: `Counter ${name} set to ${numericValue}.` 
        });
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[POST /set/${name}] Error:`), chalk.red(errorMsg));
        writeToLog(`Counter SET error name=${name}: ${errorMsg}`, 'counter');
        return res.error('An error occurred while setting the counter value.', 500, errorMsg);
    }
});

/**
 * POST /increment/:name
 * Increments the counter value. If non-existent, it is created and set to 1.
 * @param req - Express Request object
 * @param res - Express Response object
 */
counterRouter.post('/increment/:name', rateLimiter, async (req: Request, res: Response) => {
    const { name } = req.params;
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        writeToLog(`Counter INCR invalid name=${name}`, 'counter');
        return res.error('Counter name is required and must be valid.', 400);
    }

    if (!RedisClient || !RedisClient.isReady) {
        console.error(chalk.red("RedisClient is not initialized or ready in router."));
        writeToLog('Counter INCR redis not connected', 'counter');
        return res.error('Redis service is unavailable.', 503);
    }
    
    try {
        const existBefore = await RedisClient.exists(redisKey);

        const newValue = await incrementCounter(redisKey);
        const exist = existBefore === 1;
        
        console.log(chalk.magenta(`[POST /increment/${name}] redisKey=${redisKey} incremented to ${newValue} (existed before=${exist})`));
        writeToLog(`Counter INCR name=${name} key=${redisKey} newValue=${newValue} existedBefore=${exist}`, 'counter');

        return res.success({ 
            counterName: name, 
            redisKey: redisKey, 
            newValue: newValue,
            exist: exist
        });
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red(`[POST /increment/${name}] Error:`), chalk.red(errorMsg));
        
        const isRedisNotConnected = errorMsg.includes('Redis client is not connected');
        if (isRedisNotConnected) {
            writeToLog(`Counter INCR not connected name=${name}`, 'counter');
            return res.error('Redis client is not connected.', 503);
        }

        writeToLog(`Counter INCR error name=${name}: ${errorMsg}`, 'counter');
        return res.error('An error occurred while incrementing the counter value.', 500, errorMsg);
    }
});

export default counterRouter;