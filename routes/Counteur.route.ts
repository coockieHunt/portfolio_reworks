// exporess
import express, { Request, Response, Router } from 'express';
import { param, body } from 'express-validator';

// services
import { RedisService, RedisClient } from '../services/Redis.service'; 

// Constants
import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant'; 

// log
import { writeToLog, logConsole } from '../middlewares/log.middlewar';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';

const counterRouter: Router = express.Router({ mergeParams: true });

/**
 * Validates the provided name against AUTHORIZED_REDIS_KEYS and returns the actual Redis key string.
 * @param name - The user-provided key name (e.g., "GLOBAL_STATUS").
 * @returns The Redis key string or null if invalid.
 */
function getValidatedRedisKey(name: string | undefined): string | null {
    if (!name || typeof name !== 'string' || name.trim() === '') { 
        return null; 
    }
    
    const upperName = name.toUpperCase() as keyof typeof AUTHORIZED_REDIS_KEYS;
    const key = AUTHORIZED_REDIS_KEYS[upperName];
    
    return key || null; 
}

const validateRedisKey = (value: string) => {
    const upperName = value.toUpperCase() as keyof typeof AUTHORIZED_REDIS_KEYS;
    if (!AUTHORIZED_REDIS_KEYS[upperName]) {
        throw new Error('Invalid counter name');
    }
    return true;
};

/**
 ** GET /get/:name get value of counter
 ** Retrieves the counter value. Creates and initializes to 0 if non-existent.
 *  @param req Express Request object
 *  @param res Express Response object
 */
counterRouter.get('/get/:name', 
    rateLimiter, 
    param('name').custom(validateRedisKey),
    validateRequest,
    async (req: Request<{ name: string }>, res: Response) => {
        const { name } = req.params; 
        const redisKey = getValidatedRedisKey(name);

        if (!redisKey) {return res.error('Counter name is required and must be valid.', 400);}

        try {
            const { value, exist } = await RedisService.getCounter(redisKey); 

            if (!exist) {
                logConsole('GET', `/counter/get/${name}`, 'WARN', `Counter not found`, { redisKey });
                writeToLog(`Counter GET not found name=${name}`, 'counter');
                return res.idNotFound(name, `Counter ${name} not found`);
            }

            logConsole('GET', `/counter/get/${name}`, 'INFO', `Retrieved counter value`, { redisKey, value, exist });
            writeToLog(`Counter GET name=${name} key=${redisKey} value=${value} exist=${exist}`, 'counter');

            return res.success({ 
                counterName: name, 
                redisKey: redisKey, 
                counterValue: value,
                exist: exist
            });

        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('GET', `/counter/get/${name}`, 'FAIL', `Error retrieving counter value`, { error: errorMsg, redisKey });
            writeToLog(`Counter GET error name=${name}: ${errorMsg}`, 'counter');
            return res.error('An error occurred while getting the counter value.', 500, errorMsg);
        }
});

/**
 ** POST /increment/:name
 ** Increments the counter value. If non-existent, it is created and set to 1.
 *  @param req Express Request object
 *  @param res Express Response object
 */
counterRouter.post('/increment/:name', 
    rateLimiter, 
    param('name').custom(validateRedisKey),
    validateRequest,
    async (req: Request<{ name: string }>, res: Response) => {
        const { name } = req.params;
        const redisKey = getValidatedRedisKey(name);

        if (!redisKey) {return res.error('Counter name is required and must be valid.', 400);}

        if (!RedisClient || !RedisClient.isReady) {
            logConsole('POST', `/counter/increment/${name}`, 'WARN', `Redis service unavailable`, { name });
            writeToLog('Counter INCR redis not connected', 'counter');
            return res.error('Redis service is unavailable.', 503);
        }
        
        try {
            const existBefore = await RedisClient.exists(redisKey);

            const newValue = await RedisService.incrementCounter(redisKey);
            const exist = existBefore === 1;
            logConsole('POST', `/counter/increment/${name}`, 'OK', `Incremented counter value`, { redisKey, newValue, exist });
            writeToLog(`Counter INCR name=${name} key=${redisKey} newValue=${newValue} existedBefore=${exist}`, 'counter');

            return res.success({ 
                counterName: name, 
                redisKey: redisKey, 
                counterValue: newValue,
                exist: exist
            });
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', `/counter/increment/${name}`, 'FAIL', `Error incrementing counter value`, { error: errorMsg, redisKey });
            
            const isRedisNotConnected = errorMsg.includes('Redis client is not connected');
            if (isRedisNotConnected) {
                writeToLog(`Counter INCR not connected name=${name}`, 'counter');
                return res.error('Redis client is not connected.', 503);
            }

            writeToLog(`Counter INCR error name=${name}: ${errorMsg}`, 'counter');
            return res.error('An error occurred while incrementing the counter value.', 500, errorMsg);
        }
    }
);


counterRouter.post('/decrement/:name', 
    rateLimiter, 
    param('name').custom(validateRedisKey),
    validateRequest,
    authenticateToken,
    async (req: Request<{ name: string }>, res: Response) => {
        const { name } = req.params;
        const redisKey = getValidatedRedisKey(name);

        if (!redisKey) {return res.error('Counter name is required and must be valid.', 400);}

        if (!RedisClient || !RedisClient.isReady) {
            logConsole('POST', `/counter/decrement/${name}`, 'WARN', `Redis service unavailable`, { name });
            writeToLog('Counter DECR redis not connected', 'counter');
            return res.error('Redis service is unavailable.', 503);
        }
        
        try {
            const existBefore = await RedisClient.exists(redisKey);
            const currentValue = await RedisClient.get(redisKey);
            if(currentValue === "0") {
                logConsole('POST', `/counter/decrement/${name}`, 'WARN', `Counter value is already at 0`, { redisKey });
                writeToLog(`Counter DECR name=${name} key=${redisKey} already at 0`, 'counter');
                return res.error('Counter value is already at 0 and cannot decrement below 0.', 400);
            }
            const newValue = await RedisClient.decr(redisKey);
            const exist = existBefore === 1;
            logConsole('POST', `/counter/decrement/${name}`, 'OK', `Decremented counter value`, { redisKey, newValue, exist });
            writeToLog(`Counter DECR name=${name} key=${redisKey} newValue=${newValue} existedBefore=${exist}`, 'counter');

            return res.success({ 
                counterName: name, 
                redisKey: redisKey, 
                counterValue: newValue,
                exist: exist
            });
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', `/counter/decrement/${name}`, 'FAIL', `Error decrementing counter value`, { error: errorMsg, redisKey });
            
            const isRedisNotConnected = errorMsg.includes('Redis client is not connected');
            if (isRedisNotConnected) {
                writeToLog(`Counter DECR not connected name=${name}`, 'counter');
                return res.error('Redis client is not connected.', 503);
            }

            writeToLog(`Counter DECR error name=${name}: ${errorMsg}`, 'counter');
            return res.error('An error occurred while decrementing the counter value.', 500, errorMsg);
        }
    }
);


counterRouter.post('/reset/:name', 
    rateLimiter, 
    param('name').custom(validateRedisKey),
    validateRequest,
    authenticateToken,
    async (req: Request<{ name: string }>, res: Response) => {
        const { name } = req.params;
        const redisKey = getValidatedRedisKey(name);

        if (!redisKey) {return res.error('Counter name is required and must be valid.', 400);}

        try {
            await RedisService.setCounter(redisKey, 0);
            logConsole('POST', `/counter/reset/${name}`, 'OK', `Reset counter value`, { redisKey });
            writeToLog(`Counter RESET name=${name} key=${redisKey}`, 'counter');
            return res.success({ 
                counterName: name,
                redisKey: redisKey,
                counterValue: 0,
                exist: true,
                message: `Counter ${name} has been reset to 0.` 
            });
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', `/counter/reset/${name}`, 'FAIL', `Error resetting counter value`, { error: errorMsg, redisKey });
            writeToLog(`Counter RESET error name=${name}: ${errorMsg}`, 'counter');
            return res.error('An error occurred while resetting the counter value.', 500, errorMsg);
        }
    }
);  




export default counterRouter;