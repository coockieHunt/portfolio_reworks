import express, { Request, Response, Router } from 'express';

// middlewares
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';

// services
import { CloudinaryService } from '../../services/Cloudinary.service';

const ProxyCloudinaryRoute: Router = express.Router();

// Proxy image from Cloudinary
ProxyCloudinaryRoute.get('/proxy/:public_id', rateLimiter, async (req: Request, res: Response) => {
    const { public_id } = req.params;
    if (!public_id) return res.status(400).json({ error: 'public_id is required' });

    try {
        const forceRefresh = req.query.refresh === 'true';
        const { stream, statusCode, contentType, etag } = await CloudinaryService.proxyImage(
            public_id, 'blog', req.headers['if-none-match'] as string, forceRefresh
        );

        if (statusCode === 304) return res.status(304).end();
        if (!stream) return res.status(statusCode).send('Image introuvable');

        res.setHeader('Content-Type', contentType || 'image/png');
        res.setHeader('Cache-Control', forceRefresh 
            ? 'public, max-age=60' 
            : 'public, max-age=86400, stale-while-revalidate=3600'
        );
        if (etag) res.setHeader('ETag', etag);
        
        stream.pipe(res);
    } catch {
        res.status(500).json({ error: 'Error proxying image' });
    }
});

export default ProxyCloudinaryRoute;