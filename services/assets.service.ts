import * as fs from 'fs';
import { promises as fsPromises } from 'fs'; 
import path from 'path';
import sharp from 'sharp';

import { AUTHORIZED_REDIS_KEYS } from '../constants/redis.constant';
import { hashGet, hashSet, hashDel, hashGetAll, cacheDel, isRedisReady } from '../utils/cache.helper';
import { logConsole } from '../middlewares/log.middlewar';

export interface AssetDetail {
    file: string;
    cached: boolean;
    id: string | null;
    version: number | null;
}

export class AssetsService {
    private static assetsDirectory = path.join(process.cwd(), 'assets');

    static getAssetPath(filename: string): string {
        return path.join(this.assetsDirectory, filename);
    }

    /**
        * Uploads an asset to the server and updates the Redis cache.
        * Images are automatically converted to WebP format.
        * @param buffer - The file buffer to upload
        * @param name - The original name of the file
        * @param id - The identifier for the asset
        * @param folder - The folder/category for the asset
        * @param extension - The original file extension (will be converted to .webp for images)
        * @returns The new filename if successful, null otherwise
     */
    static async uploadAsset(
        buffer: Buffer, 
        name: string,
        id: string,
        folder: string = "blog",
        extension: string = ".png" 
    ): Promise<string | null> { 
        if (!isRedisReady()) {
            throw new Error("Redis client is not connected.");
        }

        try {
            if (!fs.existsSync(this.assetsDirectory)) {
                await fsPromises.mkdir(this.assetsDirectory, { recursive: true });
            }

            const assetField = `${folder}:${id}`;

            // Informative check (non-blocking)
            const currentCachedId = await hashGet(AUTHORIZED_REDIS_KEYS.ASSET_LIST, assetField);
            if (currentCachedId) {
                logConsole("INFO", "ASSETS_SERVICE", "INFO", "Asset already exists in cache", { existingFile: currentCachedId });
            }

            const timestamp = Date.now();
            const nameFormatted = name.replace(/\s+/g, '-').toLowerCase();
            
            // Convert image to WebP format
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'];
            const isImage = imageExtensions.includes(extension.toLowerCase());
            
            let finalBuffer = buffer;
            let finalExtension = extension;
            
            if (isImage) {
                try {
                    finalBuffer = await sharp(buffer)
                        .webp({ quality: 80 })
                        .toBuffer();
                    finalExtension = '.webp';
                    logConsole("INFO", "ASSETS_SERVICE", "OK", "Image converted to WebP", { originalExtension: extension });
                } catch (conversionError: any) {
                    logConsole("WARN", "ASSETS_SERVICE", "WARN", "WebP conversion failed, using original format", { error: conversionError.message });
                }
            }
            
            const newPhysicalName = `${id}-${nameFormatted}-${timestamp}${finalExtension}`;
            const fullPath = path.join(this.assetsDirectory, newPhysicalName);

            await fsPromises.writeFile(fullPath, finalBuffer);
            logConsole("INFO", "ASSETS_SERVICE", "OK", "File written to disk", { path: fullPath });

            await hashSet(
                AUTHORIZED_REDIS_KEYS.ASSET_LIST,
                assetField,    
                newPhysicalName 
            );

            logConsole("INFO", "ASSETS_SERVICE", "OK", "Redis updated successfully");
            return newPhysicalName;

        } catch (error: any) {
            logConsole("ERROR", "ASSETS_SERVICE", "FAIL", "Error uploading asset", { error: error.message });
            return null;
        }
    }

    /**
        * Retrieves the filename of an asset based on its ID and folder.
        * @param id - The identifier of the asset
        * @param folder - The folder/category of the asset
        * @returns The filename if found, undefined otherwise
     */
    static async getAssetFilename(id: string, folder: string = "blog"): Promise<string | undefined> {
        const assetField = `${folder}:${id}`;
        
        const filename = await hashGet(AUTHORIZED_REDIS_KEYS.ASSET_LIST, assetField);

        if (filename) {
            return filename;
        }

        if (!fs.existsSync(this.assetsDirectory)) {
            return undefined;
        }

        try {
            const files = await fsPromises.readdir(this.assetsDirectory);

            const prefix = `${id}-`;
            
            const matchingFiles = files.filter(file => file.startsWith(prefix));

            if (matchingFiles.length === 0) {
                return undefined;
            }

            matchingFiles.sort(); 
            const foundFilename = matchingFiles[matchingFiles.length - 1];

            await hashSet(
                AUTHORIZED_REDIS_KEYS.ASSET_LIST,
                assetField,
                foundFilename
            );

            return foundFilename;

        } catch (error: any) {
            logConsole("ERROR", "ASSETS_SERVICE", "FAIL", "Error searching disk in getAssetFilename", { error: error.message });
            return undefined;
        }
    }
 
    /**
        * Deletes an asset from the server and removes its Redis cache entry.
        * @param id - The identifier of the asset
        * @param folder - The folder/category of the asset
        * @returns True if deletion was successful, false otherwise
     */
    static async deleteAsset(id: string, folder: string = "blog"): Promise<boolean> {
        const assetField = `${folder}:${id}`;
        
        let filename = await hashGet(AUTHORIZED_REDIS_KEYS.ASSET_LIST, assetField);

        if (!filename) {
             const manualSearch = await this.getAssetFilename(id, folder);
             if (manualSearch) filename = manualSearch;
        }

        if (!filename) {
            logConsole("WARN", "ASSETS_SERVICE", "FAIL", "Asset not found for deletion.");
            return false;
        }

        const filePath = this.getAssetPath(filename);

        try {
            try {
                await fsPromises.unlink(filePath);
                logConsole("INFO", "ASSETS_SERVICE", "OK", "File deleted from disk", { filename });
            } catch (err) {
                 logConsole("WARN", "ASSETS_SERVICE", "FAIL", "Physical file not found, deleting cache only.");
            }
            
            await hashDel(AUTHORIZED_REDIS_KEYS.ASSET_LIST, assetField);
            logConsole("INFO", "ASSETS_SERVICE", "OK", "Entry deleted from Redis cache");
            return true;
        } catch (error: any) {
            logConsole("ERROR", "ASSETS_SERVICE", "FAIL", "Error deleting asset", { error: error.message });
            return false;
        }
    }

    /**
        * Clears cached assets in Redis for a specific asset ID.
        * @param id - The identifier of the asset
        * @returns The number of cache entries deleted
    */
    static async clearAssetsCache(id: string): Promise<number> {
        const allAssets = await hashGetAll(AUTHORIZED_REDIS_KEYS.ASSET_LIST);
        const keysToDelete = Object.keys(allAssets).filter(key => key.endsWith(`:${id}`));

        let count = 0;
        for (const key of keysToDelete) {
            await hashDel(AUTHORIZED_REDIS_KEYS.ASSET_LIST, key);
            count++;
        }
        return count; 
    }

    /**
        * Clears all cached assets in Redis.
        * @returns void
    */
    static async clearAllAssets(): Promise<void> {
        await cacheDel(AUTHORIZED_REDIS_KEYS.ASSET_LIST);
        logConsole("INFO", "ASSETS_SERVICE", "OK", "All assets cache cleared.");
    }

    static async listAllAssets(): Promise<AssetDetail[]> {
        try {
            if (!fs.existsSync(this.assetsDirectory)) {
                logConsole("WARN", "ASSETS_SERVICE", "FAIL", "Assets directory does not exist");
                return [];
            }

            const localFiles = await fsPromises.readdir(this.assetsDirectory);
            const cleanFiles = localFiles.filter(f => !f.startsWith('.'));

            const redisAssets = await hashGetAll(AUTHORIZED_REDIS_KEYS.ASSET_LIST);

            const filenameToRedisKey = new Map<string, string>();
            if (redisAssets) {
                for (const [key, filename] of Object.entries(redisAssets)) {
                    filenameToRedisKey.set(filename as string, key);
                }
            }

            const results: AssetDetail[] = cleanFiles.map(filename => {
                const redisKey = filenameToRedisKey.get(filename);
                
                return {
                    file: filename,
                    cached: !!redisKey, 
                    id: this.extractId(filename, redisKey),
                    version: this.extractVersionFromFilename(filename)
                };
            });

            return results;

        } catch (error: any) {
            logConsole("ERROR", "ASSETS_SERVICE", "FAIL", "Error listing assets", { error: error.message });
            return [];
        }
    }

    /**
        * Extracts the asset ID from the filename or Redis key.
        * @param filename - The asset filename
        * @param redisKey - The Redis key associated with the asset (optional)
        * @returns The extracted asset ID or null if not found
    */
    private static extractId(filename: string, redisKey?: string): string | null {
        if (redisKey) {
            const parts = redisKey.split(':');
            return parts.length > 1 ? parts[parts.length - 1] : null;
        }

        const parts = filename.split('-');
        return parts.length > 0 ? parts[0] : null;
    }

    /**
        * Extracts the version (timestamp) from the filename.
        * @param filename - The asset filename
        * @returns The extracted version as a number or null if not found
    */
    private static extractVersionFromFilename(filename: string): number | null {
        const nameWithoutExt = path.parse(filename).name; 
        const parts = nameWithoutExt.split('-');

        if (parts.length < 2) return null;

        const potentialTimestamp = parts[parts.length - 1];
        const parsedTs = parseInt(potentialTimestamp, 10);

        return !isNaN(parsedTs) ? parsedTs : null;
    }
}