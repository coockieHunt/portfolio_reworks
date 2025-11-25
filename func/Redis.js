
import chalk from 'chalk';

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
    });
    
    try {
        await RedisClient.connect();
        console.log(chalk.green('Connected to Redis!'));
        return true;
    } catch (error) {
        console.error(chalk.red('An error occurred while connecting to Redis:'));
        console.error(chalk.red(error.stack || error.message || error));
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
        
        return { value: numericValue, exist: exist };

    } catch (error) {
        console.error(chalk.red(`An error occurred while getting/initializing counter ${counterName}:`), chalk.red(error.stack || error.message || error));
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
    await RedisClient.set(counterName, value); 
}

/**
 * Increments the counter value in Redis atomically.
 * @param {string} counterName - The Redis key name.
 * @returns {Promise<number>} The new value of the counter.
 */
async function incrementCounter(counterName) {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected."); }
    return await RedisClient.incr(counterName);
}


export { getCounter, setCounter, incrementCounter, connectRedis, RedisClient };