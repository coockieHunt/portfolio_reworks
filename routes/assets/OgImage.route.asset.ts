import React from 'react';

//packages
import express, { Request, Response, Router } from 'express';
import { query } from 'express-validator';
import { ImageResponse } from '@vercel/og';

//services
import { AssetsService } from '../../services/assets.service';
import { hashGet, hashSet } from '../../utils/cache.helper';
import { AUTHORIZED_REDIS_KEYS } from '../../constants/redis.constant';

//middlewares
import { logConsole } from '../../middlewares/log.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import rateLimiter from '../../middlewares/rateLimiter.middlewar';

//templates
import { BlogOgTemplate } from '../../templates/og/blog.OgTemplate';


const OpenGraphRouter: Router = express.Router({ mergeParams: true });
OpenGraphRouter.use(rateLimiter);

const FOLDER_NAME = 'og-blog';

const CacheEnabled = String(process.env.BLOG_OG_CACHE || "true").toLowerCase() === 'true';

const getPublicId = (slug: string): string => {
    return slug.replace(/[^a-zA-Z0-9-_]/g, '-');
};

const generateImage = async (title: string, author?: string, date?: string): Promise<Buffer> => {
    const RenderedImage = React.createElement(BlogOgTemplate, { title, author, date });
    const imageResponse = new ImageResponse(RenderedImage as any, { width: 1200, height: 630 });
    return Buffer.from(await imageResponse.arrayBuffer());
};

// Redis key to store OG metadata (creation timestamp)
const getOgMetaKey = (publicId: string): string => `${publicId}:meta`;

OpenGraphRouter.get(
    '/get',
    [
        query('slug').isString().notEmpty(),
        query('title').isString().notEmpty(),
        query('author').optional().isString(),
        query('date').optional().isISO8601(),
        query('lastEdit').optional().isISO8601(),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { slug, title, author, date, lastEdit } = req.query as {
                slug: string;
                title: string;
                author?: string;
                date?: string;
                lastEdit?: string;
            };

            const publicId = getPublicId(slug);
            const lastEditDate = lastEdit ? new Date(lastEdit) : null;

            if (CacheEnabled) {
                // Check if image exists locally
                const existingFilename = await AssetsService.getAssetFilename(publicId, FOLDER_NAME);
                
                if (existingFilename) {
                    // Retrieve metadata (creation timestamp) from Redis
                    const metaKey = getOgMetaKey(publicId);
                    const createdAtStr = await hashGet(AUTHORIZED_REDIS_KEYS.OG_META, metaKey);
                    const imageCreatedAt = createdAtStr ? new Date(createdAtStr) : null;

                    // If lastEdit is more recent than image creation, regenerate
                    if (lastEditDate && imageCreatedAt && imageCreatedAt < lastEditDate) {
                        try {
                            await AssetsService.deleteAsset(publicId, FOLDER_NAME);
                            logConsole('GET', 'og/blog', 'INFO', 'Image outdated, regenerating', { slug });
                        } catch (e: any) {
                            console.error('[OG] Error deleting old image:', e?.message || e);
                        }
                    } else {
                        // Serve image from local cache
                        const filePath = AssetsService.getAssetPath(existingFilename);
                        res.setHeader('Content-Type', 'image/png');
                        res.setHeader('Cache-Control', 'public, max-age=86400');
                        res.setHeader('X-Og-Source', 'cache');
                        logConsole('GET', 'og/blog', 'INFO', 'Served from local cache', { slug });
                        return res.sendFile(filePath);
                    }
                }
            } else {
                logConsole('GET', 'og/blog', 'INFO', 'Cache disabled, forcing generation', { slug });
            }

            // Generate the image
            const buffer = await generateImage(title, author, date);

            if (CacheEnabled) {
                try {
                    // Save locally
                    await AssetsService.uploadAsset(buffer, slug, publicId, FOLDER_NAME, '.png');
                    
                    // Store creation timestamp in Redis
                    const metaKey = getOgMetaKey(publicId);
                    await hashSet(AUTHORIZED_REDIS_KEYS.OG_META, metaKey, new Date().toISOString());
                    
                    logConsole('GET', 'og/blog', 'INFO', 'Generated and cached locally', { slug });
                } catch (e: any) {
                    console.error('[OG] Error saving to local storage:', e?.message || e);
                }
            }

            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', CacheEnabled ? 'public, max-age=86400' : 'no-cache, no-store, must-revalidate');
            res.setHeader('X-Og-Source', CacheEnabled ? 'generated' : 'generated-no-cache');
            
            return res.send(buffer);

        } catch (error: any) {
            const errorMessage = error?.message || error?.toString() || 'Unknown error';
            console.error('[OG] Fatal error:', errorMessage, error?.stack);
            logConsole('GET', 'og/blog', 'FAIL', `Error: ${errorMessage}`, { slug: req.query.slug });
            return res.status(500).json({ error: 'Error generating OG image', details: errorMessage });
        }
    }
);

export default OpenGraphRouter;