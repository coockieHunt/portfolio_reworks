// service
import { RedisClient } from '../services/Redis.service';

// constants
import REDIS_KEYS from '../constants/redis.constant';

//color
import chalk from 'chalk';

// middlewares
import { writeToLog } from '../middlewares/log.middlewar';

// type
export interface GuestBookEntry {
    name: string;
    message: string;
    date: string;
}

export interface GuestBookResponse {
    count: number;
    entries: GuestBookEntry[];
}

/**
 * Retrieves all guestbook entries from Redis.
 * @returns Array of guestbook entries.
 */
export async function getGuestBookEntries(): Promise<GuestBookResponse> {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected.");}

    try {
        const rawEntries: string[] = await RedisClient.lRange(REDIS_KEYS.GUESTBOOK_ENTRIES, 0, -1);

        const entries: GuestBookEntry[] = rawEntries.map((entry) => {
            try {
                return JSON.parse(entry);
            } catch (e) {
                console.error("error parsing entry guestbook", e);
                return null; 
            }
        }).filter(entry => entry !== null) as GuestBookEntry[];

        writeToLog(`GuestBook READ count=${entries.length}`, 'guestbook');

        return {
            count: entries.length,
            entries: entries
        };
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red('Error getting guestbook entries:'), error);
        writeToLog(`GuestBook READ error: ${errorMsg}`, 'guestbook');
        throw error;
    }
}

/**
 * Adds a new guestbook entry to Redis.
 * @param name - The name of the person.
 * @param message - The message content.
 * @returns True if successful.
 */
export async function addGuestBookEntry(name: string, message: string): Promise<boolean> {
    if (!RedisClient || !RedisClient.isReady) {throw new Error("Redis client is not connected.");}

    const escapeHtml = (text: string) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    try {
        const entryData: GuestBookEntry = {
            name: escapeHtml(name.trim()), 
            message: escapeHtml(message.trim()),
            date: new Date().toISOString()
        };

        const entryString = JSON.stringify(entryData);
        
        await RedisClient.lPush(REDIS_KEYS.GUESTBOOK_ENTRIES, entryString);
        
        writeToLog(`GuestBook WRITE success: by=${name.trim()} length=${message.trim().length}`, 'guestbook');
        return true;
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        console.error(chalk.red('Error adding guestbook entry:'), error);
        writeToLog(`GuestBook WRITE error: ${errorMsg}`, 'guestbook');
        throw error;
    }
}