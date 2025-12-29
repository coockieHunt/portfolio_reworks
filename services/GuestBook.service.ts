// services
import { RedisClient } from '../services/Redis.service';
import { validateKey } from '../utils/redis.helper';

// constants
import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant';

// middlewares
import { logConsole, writeToLog } from '../middlewares/log.middlewar';

// type
interface GuestBookEntry {
    id: string;
    name: string;
    message: string;
    date: string;
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
 ** Generate id
 */
function generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 ** Retrieves guestbook entries from Redis with pagination.
 *  @param page Page number (default 1).
 *  @param limit Items per page (default 20).
 *  @returns Object containing metadata and entries.
 */
export async function getGuestBookEntries(page: number = 1, limit: number = 20): Promise<GuestBookResponseGet> {
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
                const parsed = JSON.parse(entry);
                if (!parsed.id) {
                    parsed.id = `legacy-${Date.now()}-${index}`;
                }
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

/**
 ** Adds a new guestbook entry to Redis.
 *  @param name The name of the person.
 *  @param message The message content.
 *  @returns The created entry with its ID.
 */
export async function addGuestBookEntry(name: string, message: string): Promise<GuestBookEntry> {
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
            id: generateId(),
            name: escapeHtml(name.trim()), 
            message: escapeHtml(message.trim()),
            date: new Date().toISOString()
        };

        const entryString = JSON.stringify(entryData);
        
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
 ** Deletes a guestbook entry by ID from Redis.
 *  @param id The ID of the entry to delete.
 *  @returns True if the entry was found and deleted, false otherwise.
 */
export async function deleteGuestBookEntry(id: string): Promise<GuestBookDeleteResponse> {
    validateKey(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES);

    if (!RedisClient || !RedisClient.isReady) {
        throw new Error("Redis client is not connected.");
    }

    try {
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
            return {
                success: false,
                meta: {
                    id: id
                },
                message: 'Entry not found',
            };
        }
        
        const removed = await RedisClient.lRem(AUTHORIZED_REDIS_KEYS.GUESTBOOK_ENTRIES, 1, entryToDelete);
        
        if (removed > 0) {
            writeToLog(`GuestBook DELETE success: id=${id}`, 'guestbook');
            return {
                success: true,
                meta: {
                    id: id
                },
                message: 'Entry deleted successfully',
            };
        } else {
            writeToLog(`GuestBook DELETE failed: id=${id}`, 'guestbook');
            return {
                success: false,
                meta: {
                    id: id
                },
                message: 'Entry not found',
            };
        }
    } catch (error: any) {
        const errorMsg = error.stack || error.message || String(error);
        logConsole('DELETE', '/guestbook/', 'FAIL', 'Error deleting guestbook entry', { error: errorMsg, id });
        writeToLog(`GuestBook DELETE error: ${errorMsg} id=${id}`, 'guestbook');
        throw error;
    }
}