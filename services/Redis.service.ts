//redis
import { RedisClientType } from 'redis';

// middlewares
import { logConsole, writeToLog } from '../middlewares/log.middlewar';

//helpers
import { validateKey } from '../utils/redis.helper';

export let RedisClient: RedisClientType | null = null;


/**
 ** Connects and initializes the Redis client if not already connected.
 ** Sets up error handling and logs connection status.
 *  @param client The Redis client instance to connect.
 *  @returns True if the client was connected (isReady), false otherwise
 */
export async function connectRedis(client: RedisClientType): Promise<void> {
    if (RedisClient && RedisClient.isReady) return; 
    
    RedisClient = client; 

    RedisClient.on('error', (err: Error) => {
        writeToLog(`Redis Runtime Error: ${err.message}`, 'redis');
    });
    
    try {
        await RedisClient.connect(); 
        writeToLog('Redis connection established', 'redis');
    } catch (error: any) {
        writeToLog(`Redis initial connection failed: ${error.message}`, 'redis');
        throw new Error(`Could not establish connection to Redis (${error.message})`);
    }
}

/**
 ** Retrieves the counter value from Redis, initializing it to 0 if it does not exist.
 *  @param counterName The Redis key name.
 *  @returns The counter value and its initial existence status.
 */
export async function getCounter(counterName: string): Promise<{ value: number; exist: boolean }> {
    validateKey(counterName);

    if (!RedisClient || !RedisClient.isReady) {
        writeToLog(`Error: Redis not ready for getCounter(${counterName})`, 'redis');
        throw new Error("Redis client is not connected."); 
    }
    
    try {
        const value = await RedisClient.get(counterName); 
        let numericValue: number;
        let exist: boolean;

        if (value === null) {
            numericValue = 0;
            exist = false;
        } else {
            numericValue = parseInt(value, 10);
            exist = true;
        }

        writeToLog(`GET counter ${counterName} -> value=${numericValue} exist=${exist}`, 'redis');
        return { value: numericValue, exist: exist };

    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        logConsole('GET', '/counter/', 'FAIL', `Error getting counter ${counterName}`, { error: errorMsg });
        writeToLog(`Error GET counter ${counterName}: ${errorMsg}`, 'redis');
        throw error; 
    }
}

/**
 ** Sets the counter value in Redis.
 *  @param counterName The Redis key name.
 *  @param value The value to set.
 */
export async function setCounter(counterName: string, value: number | string): Promise<void> {
    validateKey(counterName);

    if (!RedisClient || !RedisClient.isReady) throw new Error("Redis client is not connected."); 
    
    try {
        await RedisClient.set(counterName, value.toString()); 
        writeToLog(`SET counter ${counterName} = ${value}`, 'redis');
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        logConsole('POST', '/counter/', 'FAIL', `Error setting counter ${counterName}`, { error: errorMsg });
        writeToLog(`Error SET counter ${counterName}: ${errorMsg}`, 'redis');
        throw error;
    }
}

/**
 ** Increments the counter value in Redis atomically.
 *  @param counterName The Redis key name.
 *  @returns The new value of the counter.
 */
export async function incrementCounter(counterName: string): Promise<number> {
    validateKey(counterName);

    if (!RedisClient || !RedisClient.isReady) throw new Error("Redis client is not connected."); 
    
    try {
        const newVal = await RedisClient.incr(counterName);
        writeToLog(`INCR counter ${counterName} -> ${newVal}`, 'redis');
        return newVal;
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        logConsole('POST', '/counter/increment/', 'FAIL', `Error incrementing counter ${counterName}`, { error: errorMsg });
        writeToLog(`Error INCR counter ${counterName}: ${errorMsg}`, 'redis');
        throw error;
    }
}

