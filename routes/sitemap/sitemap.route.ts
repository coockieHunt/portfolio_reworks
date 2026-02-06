import express, { Router } from 'express';
import SitemapController from './sitemap.controller';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';
import rateLimiter from '../../middlewares/rateLimiter.middlewar';

const RouteMap: Router = express.Router({ mergeParams: true });

RouteMap.get('/sitemap.xml',rateLimiter, asyncHandler(SitemapController.getSitemap));
RouteMap.get('/robots.txt', rateLimiter, SitemapController.getRobots);
RouteMap.get('/ai.txt', rateLimiter, SitemapController.getAiPolicy);
RouteMap.get('/manifest.json', rateLimiter, SitemapController.getManifest);

export default RouteMap;