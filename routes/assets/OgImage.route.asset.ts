import React from 'react';

//packages
import express, { Request, Response, Router } from 'express';
import { query } from 'express-validator';
import { ImageResponse } from '@vercel/og';
import dotenv from 'dotenv';

//services
import { CloudinaryService } from '../../services/Cloudinary.service';

//middlewares
import { logConsole } from '../../middlewares/log.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import rateLimiter from '../../middlewares/rateLimiter.middlewar';

//templates
import { BlogOgTemplate } from '../../templates/og/blog.OgTemplate';

dotenv.config();

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
                let existingImage = null;
                try {
                    existingImage = await CloudinaryService.getResourceInfo(publicId, FOLDER_NAME);
                } catch (e: any) {
                    console.error('[OG] Error checking existing image:', e?.message || e);
                }

                if (existingImage) {
                    const imageCreatedAt = new Date(existingImage.created_at);

                    if (lastEditDate && imageCreatedAt < lastEditDate) {
                        try {
                            await CloudinaryService.deleteResource(publicId, FOLDER_NAME);
                            logConsole('GET', 'og/blog', 'INFO', 'Image outdated, regenerating', { slug });
                        } catch (e: any) {
                            console.error('[OG] Error deleting old image:', e?.message || e);
                        }
                    } else {
                        const cached = await CloudinaryService.proxyImage(publicId, FOLDER_NAME);
                        if (cached.statusCode === 200 && cached.stream) {
                            res.setHeader('Content-Type', 'image/png');
                            res.setHeader('Cache-Control', 'public, max-age=86400');
                            res.setHeader('X-Og-Source', 'cache');
                            logConsole('GET', 'og/blog', 'INFO', 'Served from cache', { slug });
                            return cached.stream.pipe(res);
                        }
                    }
                }
            } else {
                logConsole('GET', 'og/blog', 'INFO', 'Cache disabled, forcing generation', { slug });
            }

            const buffer = await generateImage(title, author, date);

            if (CacheEnabled) {
                try {
                    await CloudinaryService.uploadBuffer(buffer, publicId, FOLDER_NAME);
                    logConsole('GET', 'og/blog', 'INFO', 'Generated and cached', { slug });
                } catch (e: any) {
                    console.error('[OG] Error uploading to Cloudinary:', e?.message || e);
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