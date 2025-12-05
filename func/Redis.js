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

    RedisClient.on('error', (err) => {
        console.error(chalk.red(`❌ Redis Client Error: ${err.message}`));
        writeToLog(`Redis Client Error: ${err.stack || err.message}`, 'redis');
    });
    
    try {
        await RedisClient.connect();
        console.log(chalk.blue('✅ Redis Ready: Connected successfully'));
        writeToLog('Redis connection established', 'redis');
        return true;
    } catch (error) {
        console.error(chalk.red(`❌ Redis Connection Failed: ${error.message}`));
        writeToLog(`Redis connection failed: ${error.stack || error.message}`, 'redis');
        return false;
    }
}

/**
 * Retrieves the counter value from Redis, initializing it to 0 if it does not exist.
 * @param {string} counterName - The Redis key name.
 * @returns {Promise<{value: number, exist: boolean}>} The counter value and its initial existence status.
 */
async function getCounter(counterName) {
    if (!RedisClient || !RedisClient.isReady) {
        writeToLog(`Error: Redis not ready for getCounter(${counterName})`, 'redis');
        throw new Error("Redis client is not connected."); 
    }
    
    try {
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
        console.error(chalk.red(`⚠️ Redis GET Error (${counterName}): ${error.message}`));
        writeToLog(`Error GET counter ${counterName}: ${error.stack || error.message}`, 'redis');
        throw error; 
    }
}

/**
 * Sets the counter value in Redis.
 * @param {string} counterName - The Redis key name.
 * @param {number} value - The value to set.
 */
async function setCounter(counterName, value) {
    if (!RedisClient || !RedisClient.isReady) throw new Error("Redis client is not connected."); 
    
    try {
        await RedisClient.set(counterName, value); 
        writeToLog(`SET counter ${counterName} = ${value}`, 'redis');
    } catch (error) {
        console.error(chalk.red(`⚠️ Redis SET Error (${counterName}): ${error.message}`));
        writeToLog(`Error SET counter ${counterName}: ${error.stack || error.message}`, 'redis');
        throw error;
    }
}

/**
 * Increments the counter value in Redis atomically.
 * @param {string} counterName - The Redis key name.
 * @returns {Promise<number>} The new value of the counter.
 */
async function incrementCounter(counterName) {
    if (!RedisClient || !RedisClient.isReady) throw new Error("Redis client is not connected."); 
    
    try {
        const newVal = await RedisClient.incr(counterName);
        writeToLog(`INCR counter ${counterName} -> ${newVal}`, 'redis');
        return newVal;
    } catch (error) {
        console.error(chalk.red(`⚠️ Redis INCR Error (${counterName}): ${error.message}`));
        writeToLog(`Error INCR counter ${counterName}: ${error.stack || error.message}`, 'redis');
        throw error;
    }
}

export { getCounter, setCounter, incrementCounter, connectRedis, RedisClient };