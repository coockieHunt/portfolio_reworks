import chalk from 'chalk';
import { writeToLog } from '../middleware/log.js';

let RedisClient = null; 

/**
 * Connects and initializes the Redis client if not already connected.
 * Sets up error handling and logs connection status.
 * 
 * @async
 * @param {object} client - The Redis client instance to connect.
 * @returns {Promise<boolean>} True if the client was connected (isReady), false otherwise
 */
async function connectRedis(client) {
    if (RedisClient && RedisClient.isReady) return true; 
    RedisClient = client; 
    RedisClient = client; 
    RedisClient.on('error', (err) => {
        console.error(chalk.red('Redis Client Error:'), chalk.red(err.stack || err.message || err));
        writeToLog(`Redis Client Error: ${err.stack || err.message || err}`, 'redis');
    });
    
    try {
        writeToLog('Attempting Redis connection...', 'redis');
        await RedisClient.connect();
        console.log(chalk.green('Connected to Redis!'));
        writeToLog('Connected to Redis', 'redis');
        return true;
    } catch (error) {
        console.error(chalk.red('An error occurred while connecting to Redis:'));
        console.error(chalk.red(error.stack || error.message || error));
        writeToLog(`Redis connection failed: ${error.stack || error.message || error}`, 'redis');
        return false;
    }
}


/**
 * Retrieves the counter value from Redis, initializing it to 0 if it does not exist.
 * @param {string} counterName - The Redis key name.
 * @returns {Promise<{value: number, exist: boolean}>} The counter value and its initial existence status.
 */
async function getCounter(counterName) {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected."); }
    
    try {
        writeToLog(`GET counter ${counterName} start`, 'redis');
        const value = await RedisClient.get(counterName); 
        let numericValue;
        let exist;

        if (value === null) {
            await RedisClient.set(counterName, 0);
            numericValue = 0;
            exist = false;
        } else {
            numericValue = parseInt(value, 10);
            exist = true;
        }
        writeToLog(`GET counter ${counterName} -> value=${numericValue} exist=${exist}`, 'redis');
        return { value: numericValue, exist: exist };

    } catch (error) {
        console.error(chalk.red(`An error occurred while getting/initializing counter ${counterName}:`), chalk.red(error.stack || error.message || error));
        writeToLog(`Error GET counter ${counterName}: ${error.stack || error.message || error}`, 'redis');
        throw new Error('Redis GET/SET operation failed'); 
    }
}

/**
 * Sets the counter value in Redis.
 * @param {string} counterName - The Redis key name.
 * @param {number} value - The value to set.
 */
async function setCounter(counterName, value) {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected."); }
    writeToLog(`SET counter ${counterName} = ${value}`, 'redis');
    await RedisClient.set(counterName, value); 
}

/**
 * Increments the counter value in Redis atomically.
 * @param {string} counterName - The Redis key name.
 * @returns {Promise<number>} The new value of the counter.
 */
async function incrementCounter(counterName) {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected."); }
    const newVal = await RedisClient.incr(counterName);
    writeToLog(`INCR counter ${counterName} -> ${newVal}`, 'redis');
    return newVal;
}


export { getCounter, setCounter, incrementCounter, connectRedis, RedisClient };