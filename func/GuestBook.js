import { RedisClient } from './Redis.js';
import REDIS_KEYS from '../constant/redisKey.js';
import chalk from 'chalk';

/**
 * Retrieves all guestbook entries from Redis.
 * @returns {Promise<Array>} Array of guestbook entries.
 */
export async function getGuestBookEntries() {
    if (!RedisClient || !RedisClient.isReady) {
        throw new Error("Redis client is not connected.");
    }
    try {
        const entries = await RedisClient.lRange(REDIS_KEYS.GUESTBOOK_ENTRIES, 0, -1);
        return entries.map(entry => JSON.parse(entry));
    } catch (error) {
        console.error(chalk.red('Error getting guestbook entries:'), error);
        throw error;
    }
}

/**
 * Adds a new guestbook entry to Redis.
 * @param {string} name - The name of the person.
 * @param {string} message - The message content.
 * @returns {Promise<boolean>} True if successful.
 */
export async function addGuestBookEntry(name, message) {
    if (!RedisClient || !RedisClient.isReady) {
        throw new Error("Redis client is not connected.");
    }

    if (!name || !message || name.trim().length === 0 || message.trim().length === 0) {
        throw new Error("Name and message cannot be empty.");
    }

    if (name.length > 50) throw new Error("Name is too long (max 50 chars).");
    if (message.length > 500) throw new Error("Message is too long (max 500 chars).");

    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.[a-zA-Z]{2,}\/?)/i;
    
    if (urlRegex.test(name) || urlRegex.test(message)) {
        throw new Error("URLs and links are not allowed.");
    }

    const htmlRegex = /<[^>]*>/;
    
    if (htmlRegex.test(name) || htmlRegex.test(message)) {
        throw new Error("Invalid characters: HTML tags are not allowed.");
    }


    try {
        const entry = JSON.stringify({
            name: name.trim(), 
            message: message.trim(),
            date: new Date().toISOString()
        });
        await RedisClient.lPush(REDIS_KEYS.GUESTBOOK_ENTRIES, entry);
        return true;
    } catch (error) {
        console.error(chalk.red('Error adding guestbook entry:'), error);
        throw error;
    }
}