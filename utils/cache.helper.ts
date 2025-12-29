//service
import { RedisClient } from '../services/Redis.service';

//helpers
import { validateKey } from '../utils/redis.helper';

//console
import chalk from 'chalk';

//type
interface CacheResponse<T> {
    cached: boolean;
    data: T | null;
}

/**
 * Generic helper to handle caching with Redis
 */
export async function withCache<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    ttl: number = 3600
): Promise<CacheResponse<T>> {
    validateKey(key);

    if (!RedisClient || !RedisClient.isReady) {return { cached: false, data: await fetchFn() };}

    try {
        const cached = await RedisClient.get(key);
        
        if (cached) {
            console.log(
                chalk.cyan(`[CACHE] `) + 
                chalk.green(`HIT   `) + 
                chalk.gray(`| Key: ${key}`)
            );
            
            return {
                cached: true,
                data: JSON.parse(cached) as T
            };
        }

        console.log(
            chalk.cyan(`[CACHE] `) + 
            chalk.yellow(`MISS  `) + 
            chalk.gray(`| Key: ${key} -> DB`)
        );

        const data = await fetchFn();

        if (data) {
            await RedisClient.set(key, JSON.stringify(data), { EX: ttl });
            console.log(
                chalk.cyan(`[CACHE] `) + 
                chalk.green(`SET   `) + 
                chalk.gray(`| Key: ${key} (${ttl}s)`)
            );
        }

        return {
            cached: false,
            data: data
        };

    } catch (error) {
        console.error(chalk.red(`[CACHE] ERROR | Key: ${key}`), error);
        return { cached: false, data: await fetchFn() }; 
    }
}