// services
import { RedisClient } from '../services/Redis.service';
import { validateKey } from '../utils/redis.helper';

// constants
import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant';

// middlewares
import { logConsole, writeToLog } from '../middlewares/log.middlewar';

// errors
import { NotFoundError } from '../utils/AppError';
import { is } from 'drizzle-orm';

// type
interface GuestBookEntry {
    id: string;
    name: string;
    message: string;
    createdAt: string;
    authorized: boolean;
}

interface GuestBookResponseGet {
    meta: {
        total_count: number;
        page: number;
        limit: number;
        total_pages: number;
    };
    entries: GuestBookEntry[];
}


interface GuestBookDeleteResponse {
    success: boolean;
    meta: {
        id: string;
    };
    message: string;
}

/**
 * GuestBook Service
 * 
 * Manages guestbook entries stored in Redis.
 * Handles CRUD operations for visitor messages with pagination support.
 * Includes HTML/XSS protection and input sanitization.
 */
export class GuestBookService {
    /**
     * Generates a unique ID for guestbook entries
     * @returns A unique identifier combining timestamp and random string
     * @private
     */
    private static generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Retrieves paginated guestbook entries from Redis
     * @param page - Page number (default: 1)
     * @param limit - Entries per page (default: 20)
     * @returns Promise with entries and pagination metadata
     * @throws {Error} If Redis client is not connected
     */
    static async getGuestBookEntries(page: number = 1, limit: number = 20, isAuthenticated: boolean = false): Promise<GuestBookResponseGet> {
        validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        const start = (page - 1) * limit;
        const end = start + limit - 1;

        try {
            const [rawEntries, totalCount] = await Promise.all([
                RedisClient.lRange(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, start, end),
                RedisClient.lLen(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES)
            ]);

            const entries: GuestBookEntry[] = rawEntries.map((entry, index) => {
                try {
                    if(!isAuthenticated) {
                        const parsedEntry = JSON.parse(entry);
                        if(!parsedEntry.authorized) {
                            return null; 
                        }
                    }

                    const parsed = JSON.parse(entry);
                   
                    if (!parsed.id) {
                        parsed.id = `legacy-${Date.now()}-${index}`;
                    }
                    if (!parsed.createdAt) {
                        parsed.createdAt = parsed.date || new Date().toISOString();
                    }
                    console.log("Parsed guestbook entry:", parsed);
                    return parsed;
                } catch (e) {
                    console.error("error parsing entry guestbook", e);
                    return null; 
                }
            }).filter(entry => entry !== null) as GuestBookEntry[];

            writeToLog(`GuestBook READ page=${page} count=${entries.length}`, 'guestbook');

            return {
                meta: {
                    total_count: totalCount,
                    page: page,
                    limit: limit,
                    total_pages: Math.ceil(totalCount / limit)
                },
                entries: entries
            };
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('GET', '/guestbook/', 'FAIL', 'Error getting guestbook entries', { error: errorMsg });
            writeToLog(`GuestBook READ error: ${errorMsg}`, 'guestbook');
            throw error;
        }
    }

    static async authorizeGuestBookEntry(id: string): Promise<GuestBookEntry> {
        validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        const allEntries = await RedisClient.lRange(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, 0, -1);
        
        for (let i = 0; i < allEntries.length; i++) {
            const entryString = allEntries[i];
            try {
                const entry: GuestBookEntry = JSON.parse(entryString);
                if (entry.id === id) {
                    entry.authorized = true;
                    const updatedEntryString = JSON.stringify(entry);
                    await RedisClient.lSet(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, i, updatedEntryString);
                    
                    writeToLog(`GuestBook AUTHORIZE success: id=${id}`, 'guestbook');
                    return entry;
                }
            } catch (e) {
                console.error("Error parsing entry during authorize:", e);
                continue;
            }
        }

        writeToLog(`GuestBook AUTHORIZE entry not found: id=${id}`, 'guestbook');
        throw new NotFoundError(`Guestbook entry with ID "${id}" not found`);
    }

    static async unauthorizeGuestBookEntry(id: string): Promise<GuestBookEntry> {
        validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        const allEntries = await RedisClient.lRange(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, 0, -1);
        
        for (let i = 0; i < allEntries.length; i++) {
            const entryString = allEntries[i];
            try {
                const entry: GuestBookEntry = JSON.parse(entryString);
                if (entry.id === id) {
                    entry.authorized = false;
                    const updatedEntryString = JSON.stringify(entry);
                    await RedisClient.lSet(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, i, updatedEntryString);
                    
                    writeToLog(`GuestBook UNAUTHORIZE success: id=${id}`, 'guestbook');
                    return entry;
                }
            } catch (e) {
                console.error("Error parsing entry during unauthorize:", e);
                continue;
            }
        }

        writeToLog(`GuestBook UNAUTHORIZE entry not found: id=${id}`, 'guestbook');
        throw new NotFoundError(`Guestbook entry with ID "${id}" not found`);
    }

    /**
     * Adds a new entry to the guestbook with HTML sanitization
     * @param name - The visitor's name
     * @param message - The guestbook message
     * @returns Promise with the created entry including generated ID
     * @throws {Error} If Redis client is not connected
     */
    static async addGuestBookEntry(name: string, message: string): Promise<GuestBookEntry> {
        validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

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
                id: this.generateId(),
                name: escapeHtml(name.trim()), 
                message: escapeHtml(message.trim()),
                createdAt: new Date().toISOString(),
                authorized: false
            };

            const entryString = JSON.stringify(entryData);

            console.log("Adding guestbook entry:", entryString);
            await RedisClient.lPush(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, entryString);
            
            writeToLog(`GuestBook WRITE success: by=${name.trim()} length=${message.trim().length} id=${entryData.id}`, 'guestbook');
            return entryData;
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', '/guestbook/', 'FAIL', 'Error adding guestbook entry', { error: errorMsg });
            writeToLog(`GuestBook WRITE error: ${errorMsg}`, 'guestbook');
            throw error;
        }
    }

    /**
     * Deletes a guestbook entry by its ID
     * @param id - The unique entry ID to delete
     * @returns Promise with deletion result and status
     * @throws {NotFoundError} If entry is not found
     */
    static async deleteGuestBookEntry(id: string): Promise<GuestBookDeleteResponse> {
        validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

        if (!RedisClient || !RedisClient.isReady) {
            throw new Error("Redis client is not connected.");
        }

        const allEntries = await RedisClient.lRange(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, 0, -1);
        
        let entryToDelete: string | null = null;
        
        for (const entry of allEntries) {
            try {
                const parsedEntry: GuestBookEntry = JSON.parse(entry);
                if (parsedEntry.id === id) {
                    entryToDelete = entry;
                    break;
                }
            } catch (e) {
                console.error("Error parsing entry during delete:", e);
                continue;
            }
        }
        
        if (!entryToDelete) {
            writeToLog(`GuestBook DELETE entry not found: id=${id}`, 'guestbook');
            throw new NotFoundError(`Guestbook entry with ID "${id}" not found`);
        }
        
        const removed = await RedisClient.lRem(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, 1, entryToDelete);
        
        if (removed <= 0) {
            writeToLog(`GuestBook DELETE failed: id=${id}`, 'guestbook');
            throw new NotFoundError(`Failed to delete guestbook entry with ID "${id}"`);
        }
        
        writeToLog(`GuestBook DELETE success: id=${id}`, 'guestbook');
        return {
            success: true,
            meta: {
                id: id
            },
            message: 'Entry deleted successfully',
        };
    }
}