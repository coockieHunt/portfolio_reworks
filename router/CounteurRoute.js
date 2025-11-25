import express from 'express';
const counterRouter = express.Router({ mergeParams: true });
import chalk from 'chalk';

import { 
    getCounter, 
    setCounter, 
    incrementCounter, 
    RedisClient 
} from '../func/Redis.js'; 
import REDIS_KEYS from '../constant/redisKey.js'; 

/**
 * Validates the provided name against REDIS_KEYS and returns the actual Redis key string.
 * @param {string} name - The user-provided key name (e.g., "GLOBAL_STATUS").
 * @returns {string|null} The Redis key string or null if invalid.
 */
function getValidatedRedisKey(name) {
    if (!name || typeof name !== 'string' || name.trim() === '') {return null; }
    const key = REDIS_KEYS[name.toUpperCase()];
    return key || null; 
}


/**
 * GET /get/:name
 * Retrieves the counter value. Creates and initializes to 0 if non-existent.
 */
counterRouter.get('/get/:name', async (req, res) => {
    const { name } = req.params; 
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        return res.status(400).json({ 
            success: false, 
            message: `Counter name is required and must be one of: ${Object.keys(REDIS_KEYS).join(', ')}`,
            allowedKeys: Object.keys(REDIS_KEYS)
        });
    }

    try {
        const { value, exist } = await getCounter(redisKey); 
        console.log(chalk.cyan(`[GET /get/${name}] redisKey=${redisKey} value=${value} exist=${exist}`));

        return res.json({ 
            success: true, 
            counterName: name, 
            redisKey: redisKey, 
            counterValue: value,
            exist: exist
        });

    } catch (error) {
        console.error(chalk.red(`[GET /get/${name}] Error:`), chalk.red(error.stack || error.message || error));
        return res.status(500).json({ success: false, message: 'An error occurred while getting the counter value.' });
    }
});


/**
 * POST /set/:name
 * Sets the counter value. Restricted to keys in REDIS_KEYS.
 */
counterRouter.post('/set/:name', async (req, res) => {
    const { name } = req.params;
    const { value } = req.body;
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        return res.status(400).json({ 
            success: false, 
            message: `Counter name is required and must be one of: ${Object.keys(REDIS_KEYS).join(', ')}`,
            allowedKeys: Object.keys(REDIS_KEYS)
        });
    }

    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
        return res.status(400).json({ success: false, message: 'A valid numeric value is required in the request body.' });
    }

    try {
        await setCounter(redisKey, numericValue);
        console.log(chalk.yellow(`[POST /set/${name}] redisKey=${redisKey} set to ${numericValue}`));
        return res.json({ 
            success: true, 
            counterName: name,
            redisKey: redisKey,
            message: `Counter ${name} set to ${numericValue}.` 
        });
    } catch (error) {
        console.error(chalk.red(`[POST /set/${name}] Error:`), chalk.red(error.stack || error.message || error));
        return res.status(500).json({ success: false, message: 'An error occurred while setting the counter value.' });
    }
});


/**
 * POST /increment/:name
 * Increments the counter value. If non-existent, it is created and set to 1.
 */
counterRouter.post('/increment/:name', async (req, res) => {
    const { name } = req.params;
    const redisKey = getValidatedRedisKey(name);

    if (!redisKey) {
        return res.status(400).json({ 
            success: false, 
            message: `Counter name is required and must be one of: ${Object.keys(REDIS_KEYS).join(', ')}`,
            allowedKeys: Object.keys(REDIS_KEYS)
        });
    }

    if (!RedisClient || !RedisClient.isReady) {
        console.error(chalk.red("RedisClient is not initialized or ready in router."));
        return res.status(503).json({ success: false, message: 'Redis service is unavailable.' });
    }
    
    try {
        const existBefore = await RedisClient.exists(redisKey);

        const newValue = await incrementCounter(redisKey);
        const exist = existBefore === 1;
        console.log(chalk.magenta(`[POST /increment/${name}] redisKey=${redisKey} incremented to ${newValue} (existed before=${exist})`));

        return res.json({ 
            success: true, 
            counterName: name, 
            redisKey: redisKey, 
            newValue: newValue,
            exist: exist
        });
    } catch (error) {
        console.error(chalk.red(`[POST /increment/${name}] Error:`), chalk.red(error.stack || error.message || error));
        const isRedisNotConnected = (error && error.message && error.message.includes('Redis client is not connected'));
        if (isRedisNotConnected) {
            return res.status(503).json({ success: false, message: 'Redis client is not connected.' });
        }
        return res.status(500).json({ success: false, message: 'An error occurred while incrementing the counter value.' });
    }
});


export default counterRouter;