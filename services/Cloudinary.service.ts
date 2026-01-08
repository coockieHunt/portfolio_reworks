import { v2 as cloudinary } from 'cloudinary';
import cfg from '../config/default';
import fs from 'fs';
import { Readable } from 'stream';



export interface CloudinaryProxyResult {
    stream: Readable | null;
    statusCode: number;
    contentType?: string;
    etag?: string;
}

const urlCache = new Map<string, { url: string; expires: number }>();
const CACHE_TTL = 3600000; 

cloudinary.config({
    cloud_name: cfg.cloudinary.cloud_name,
    api_key: cfg.cloudinary.api_key,
    api_secret: cfg.cloudinary.api_secret,
});

/**
 * Cloudinary Service
 * 
 * Manages image storage and delivery through Cloudinary CDN.
 * Handles image uploads, deletions, and proxying with URL caching for performance.
 * Provides image resource management and cache invalidation capabilities.
 */
export class CloudinaryService {
    /**
     * Constructs the full Cloudinary resource ID with folder path
     * @param id - The resource public ID
     * @param folder - Optional folder path
     * @returns The complete resource identifier
     * @private
     */
    private static getFullId(id: string, folder?: string): string {
        return folder ? `${folder}/${id}` : id;
    }

    /**
     * Removes a specific resource URL from the cache
     * @param publicId - The Cloudinary public ID
     * @param folder - Optional folder path
     * @private
     */
    private static invalidateCache(publicId: string, folder?: string): void {
        urlCache.delete(this.getFullId(publicId, folder));
    }

    /**
     * Clears all cached Cloudinary URLs from memory
     */
    static clearCache(): void {
        urlCache.clear();
    }

    /**
     * Retrieves or generates a cached Cloudinary URL
     * @param publicId - The Cloudinary public ID
     * @param folder - Optional folder path
     * @param bustCache - Force cache refresh if true
     * @returns The Cloudinary CDN URL
     * @private
     */
    private static getCachedUrl(publicId: string, folder?: string, bustCache = false): string {
        const key = this.getFullId(publicId, folder);
        
        if (!bustCache) {
            const cached = urlCache.get(key);
            if (cached && cached.expires > Date.now()) return cached.url;
        }
        
        const url = cloudinary.url(key, { 
            secure: true, 
            format: 'png',
            version: Date.now() 
        });
        urlCache.set(key, { url, expires: Date.now() + CACHE_TTL });
        return url;
    }

    /**
     * Proxies an image from Cloudinary with caching support
     * @param publicId - The Cloudinary public ID
     * @param folder - Folder path (default: 'ogimages')
     * @param ifNoneMatch - ETag for conditional requests
     * @param forceRefresh - Force bypass cache if true
     * @returns Promise with stream and HTTP status information
     */
    static async proxyImage(publicId: string, folder = 'ogimages', ifNoneMatch?: string, forceRefresh = false): Promise<CloudinaryProxyResult> {
        try {
            const response = await fetch(this.getCachedUrl(publicId, folder, forceRefresh), {
                headers: ifNoneMatch && !forceRefresh ? { 'If-None-Match': ifNoneMatch } : {}
            });

            if (response.status === 304) return { stream: null, statusCode: 304 };
            if (!response.ok || !response.body) return { stream: null, statusCode: response.status };

            return {
                stream: Readable.fromWeb(response.body as any),
                statusCode: 200,
                contentType: response.headers.get('content-type') || 'image/png',
                etag: response.headers.get('etag') || undefined
            };
        } catch {
            return { stream: null, statusCode: 500 };
        }
    }


    /**
     * Uploads an image buffer to Cloudinary
     * @param buffer - The image buffer to upload
     * @param publicId - The desired public ID for the image
     * @param folder - Target folder (default: 'blog')
     * @returns Promise with Cloudinary upload result
     */
    static async uploadBuffer(buffer: Buffer, publicId: string, folder = 'blog'): Promise<any> {
        this.invalidateCache(publicId, folder);
        
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { 
                    public_id: publicId, 
                    folder, 
                    resource_type: 'image', 
                    overwrite: true, 
                    format: 'png',
                    invalidate: true 
                },
                (error, result) => error ? reject(error) : resolve(result)
            );
            Readable.from(buffer).pipe(uploadStream);
        });
    }

    /**
     * Uploads an image file to Cloudinary and removes the local file
     * @param filePath - Path to the local image file
     * @param folder - Target folder (default: 'blog')
     * @returns Promise with Cloudinary upload result
     */
    static async uploadImage(filePath: string, folder = 'blog'): Promise<any> {
        try {
            const result = await cloudinary.uploader.upload(filePath, { folder });
            return result;
        } finally {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
    }

    /**
     * Deletes an image from Cloudinary and invalidates its cache
     * @param publicId - The Cloudinary public ID to delete
     * @param folder - Optional folder path
     * @returns Promise with Cloudinary deletion result
     */
    static async deleteImage(publicId: string, folder?: string): Promise<any> {
        this.invalidateCache(publicId, folder);
        return cloudinary.uploader.destroy(publicId, { invalidate: true });
    }


    /**
     * Lists images from a Cloudinary folder
     * @param folder - Folder to list images from (default: 'blog')
     * @returns Promise with search results containing image metadata
     */
    static async listImages(folder = 'blog'): Promise<any> {
        return cloudinary.search.expression(`folder:${folder}`).sort_by('created_at', 'desc').max_results(30).execute();
    }

    /**
     * Retrieves metadata information for a Cloudinary resource
     * @param publicId - The resource public ID
     * @param folder - The folder path
     * @returns Promise with resource creation date or null if not found
     */
    static async getResourceInfo(publicId: string, folder: string): Promise<{ created_at: string } | null> {
        try {
            const fullId = `${folder}/${publicId}`;
            const result = await cloudinary.api.resource(fullId, { resource_type: 'image' });
            return { created_at: result.created_at };
        } catch (error: any) {
            if (error?.http_code === 404 || error?.error?.http_code === 404) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Deletes a Cloudinary resource by full path
     * @param publicId - The resource public ID
     * @param folder - The folder path
     * @returns Promise that resolves when deletion completes
     */
    static async deleteResource(publicId: string, folder: string): Promise<void> {
        const fullId = `${folder}/${publicId}`;
        await cloudinary.uploader.destroy(fullId, { resource_type: 'image' });
    }
}