//express
import express, { Request, Response, Router } from 'express';

//validators
import { body, param, query } from 'express-validator';

// services
import { BlogService } from '../services/Blog.service';
import config from '../config/default';

// middlewares
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../middlewares/responseHandler.middlewar';
import { writeToLog, logConsole } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { authenticateToken, HybridAuthenticateToken } from '../middlewares/authenticateToken.middlewar';
import { asyncHandler } from '../middlewares/errorHandler.middleware';

const BlogRoute: Router = express.Router({ mergeParams: true });

/**
 * GET /all - Get all blog posts with pagination
 * Retrieve all blog posts with pagination
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.get('/all', 
    rateLimiter, 
    HybridAuthenticateToken,
    [
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be a positive integer between 1 and 100'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

            const isAuthenticated = !!(req as any).user;
            const data = await BlogService.getAllPosts(page, limit, isAuthenticated);
            
            logConsole('GET', '/blog/', 'INFO', `Retrieved blog posts`, { count: data.posts.length, page, auth: isAuthenticated });
            writeToLog(`BlogRoute READ ok count=${data.posts.length} page=${page} auth=${isAuthenticated}`, 'blog');
            return res.success(data);
        } catch (error) {
            logConsole('GET', '/blog/', 'FAIL', `Error retrieving blog posts`, { error });
            writeToLog(`BlogRoute READ error`, 'blog');
            return res.error("error retrieving blog posts", 500, error);
        }
}, responseHandler);

/**
 * GET /offset - Get blog posts with offset-based pagination
 * Retrieve blog posts using offset-based pagination with optional filters
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.get('/offset',
    rateLimiter,[
        query('min').optional().isInt({ min: 1 }).withMessage('Min must be a positive integer'),
        query('max').optional().isInt({ min: 1, max: 100 }).withMessage('Max must be a positive integer between 1 and 100'),

        query('tagsContains').optional().isString().withMessage('Each tag must be a string'),
        query('titleContains').optional().isString().withMessage('Title filter must be a string'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const min = req.query.min ? parseInt(req.query.min as string) : 1;
            const max = req.query.max ? parseInt(req.query.max as string) : 100;

            const tagsQuery = req.query.tagsContains as string;
            const tagsContains = tagsQuery ? tagsQuery.split(',').map((tag: string) => tag.trim()) : [];
            
            const titleContains = req.query.titleContains ? (req.query.titleContains as string) : '';

            const data = await BlogService.getPostOffset(min, max, tagsContains, titleContains);
            
            logConsole('GET', '/blog/offset', 'INFO', `Retrieved blog posts with offset`, { count: data.posts.length, min, max, tagsContains, titleContains });
            writeToLog(`BlogRoute READ OFFSET ok count=${data.posts.length} min=${min} max=${max}`, 'blog');
            return res.success(data);
        } catch (error) {
            logConsole('GET', '/blog/offset', 'FAIL', `Error retrieving blog posts with offset`, { error });
            writeToLog(`BlogRoute READ OFFSET error`, 'blog');
            return res.error("error retrieving blog posts with offset", 500, error);
        }
}, responseHandler);

/**
 * GET /:slug - Get blog post by slug
 * Retrieve a blog post using its slug
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.get('/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    HybridAuthenticateToken,
    asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
        const authHeader = req.headers['authorization'];

        const user = (req as any).user;
        const isAuthenticated = !!user;

        res.setHeader('Vary', 'Authorization');

        if (isAuthenticated) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        } else {
            const maxAge = config.blog.cache_client_age;
            const staleWhileRevalidate = maxAge * 2;
            res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
        }

        const data = await BlogService.getPostBySlug(req.params.slug, isAuthenticated);
        
        if (!data || !data.data) {
             return res.error('Post not found', 404);
        }

        logConsole('GET', `/blog/${req.params.slug}`, 'INFO', `Retrieved blog post (Auth: ${isAuthenticated})`, { slug: req.params.slug });
        writeToLog(`BlogRoute READ ok slug=${req.params.slug} auth=${isAuthenticated}`, 'blog');
        
        return res.success({ 
             ...data.data, 
             cached: data.cached
        });
    }), 
responseHandler);

/**
 * POST /new - Create a new blog post
 * Create a new blog post with the provided details
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.post('/new', 
    rateLimiter, 
    [
        body('title').notEmpty().withMessage('Title is required').trim(),
        body('slug').notEmpty().withMessage('Slug is required').matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
        body('content').notEmpty().withMessage('Content is required'),
        body('summary').optional().isString().trim().withMessage('Summary must be a string'),
        body('authorId').notEmpty().isInt().withMessage('Author ID must be an integer'),
        body('tagIds').optional().isArray().withMessage('Tag IDs must be an array'),
        body('tagIds.*').optional().isInt().withMessage('Each tag ID must be an integer'),
        body('indexed').optional().isInt({ min: 0, max: 1 }).withMessage('Indexed must be 0 or 1'),
        body('published').optional().isInt({ min: 0, max: 1 }).withMessage('Published must be 0 or 1'),
    ],
    validateRequest,
    authenticateToken,
    async (req: Request, res: Response) => {
        const { title, slug, content, summary, authorId, tagIds, featuredImage, indexed, published } = req.body;

        try {
            const newPost = await BlogService.createPost({ title, slug, content, summary, authorId, tagIds, featuredImage, indexed, published });
            logConsole('POST', '/blog/', 'OK', `Created new blog post`, { slug });
            writeToLog(`BlogRoute CREATE ok slug=${slug}`, 'blog');

            return res.success({ post: newPost }, 'blog post created successfully')
        } catch (error) {
            const errMessage = (error as any).message || '';

            if (errMessage.startsWith('INVALID_TAG_IDS:')) {
                const missing = errMessage.replace('INVALID_TAG_IDS:', '');
                logConsole('POST', '/blog/', 'WARN', `Invalid tag ids`, { slug: req.body.slug, missing });
                writeToLog(`BlogRoute CREATE invalid tags slug=${req.body.slug} missing=${missing}`, 'blog');
                return res.error(`invalid tag ids: ${missing}`, 400);
            }

            if (errMessage === 'INVALID_AUTHOR') {
                logConsole('POST', '/blog/', 'WARN', `Invalid author id`, { slug: req.body.slug, authorId });
                writeToLog(`BlogRoute CREATE invalid author slug=${req.body.slug} author=${authorId}`, 'blog');
                return res.error('invalid author id', 400);
            }

            if(errMessage.includes('UNIQUE constraint failed')) {
                logConsole('POST', '/blog/', 'WARN', `Slug already exists`, { slug: req.body.slug });
                writeToLog(`BlogRoute CREATE duplicate slug=${req.body.slug}`, 'blog');

                return res.error("slug already exists", 409);
            }

            if (errMessage.includes('FOREIGN KEY constraint failed')) {
                logConsole('POST', '/blog/', 'WARN', `Foreign key constraint`, { slug: req.body.slug, authorId, tagIds });
                writeToLog(`BlogRoute CREATE foreign key fail slug=${req.body.slug}`, 'blog');
                return res.error('invalid authorId or tagIds', 400);
            }

            logConsole('POST', '/blog/', 'FAIL', `Error creating new blog post`, { error, slug: req.body.slug });
            writeToLog(`BlogRoute CREATE error slug=${req.body.slug}`, 'blog');

            return res.error("error creating blog post", 500, error);
        }
    }, 
responseHandler);

/**
 * PUT /edit/update/:slug - Update blog post by slug
 * Update the details of a blog post
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.put('/edit/update/:slug', 
    rateLimiter, 
    [
        param('slug').notEmpty().withMessage('Slug is required'),
        body('title').optional().isString().trim(),
        body('content').optional().isString(),
        body('summary').optional().isString().trim(),
        body('authorId').optional().isInt().withMessage('Author ID must be an integer'),
        body('tagIds').optional().isArray().withMessage('Tag IDs must be an array'),
        body('tagIds.*').optional().isInt().withMessage('Each tag ID must be an integer'),
        body('tags').optional().isArray().withMessage('Tags must be an array'),
        body('tags.*').optional().isInt().withMessage('Each tag ID must be an integer'),
        body('indexed').optional().isInt({ min: 0, max: 1 }).withMessage('Indexed must be 0 or 1'),
        body('published').optional().isInt({ min: 0, max: 1 }).withMessage('Published must be 0 or 1'),
        body('featuredImage').optional().isString().withMessage('Featured image must be a string'),
        body('slug').optional().matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
    ],
    validateRequest,
    authenticateToken,
    async (req: Request<{ slug: string }>, res: Response) => {
        let { title, content, summary, authorId, tagIds, tags, featuredImage, indexed, published, slug: newSlug } = req.body;
        
        if (!tagIds && tags) {
            tagIds = tags;
        }

        console.log( title, content, summary, authorId, tagIds, featuredImage, indexed, published, newSlug );
        try {
            const updatedPost = await BlogService.updatePostBySlug(req.params.slug, { title, content, summary, authorId, tagIds, featuredImage, indexed, published, slug: newSlug });

            if (!updatedPost) {
                logConsole('PUT', `/blog/${req.params.slug}`, 'WARN', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute UPDATE not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('PUT', `/blog/${req.params.slug}`, 'OK', `Updated blog post`, { slug: req.params.slug });
            writeToLog(`BlogRoute UPDATE ok slug=${req.params.slug}`, 'blog');

            return res.success({ post: updatedPost }, `post (${req.params.slug}) updated successfully`);
        } catch (error) {
            const errMessage = (error as any).message || '';

            if (errMessage.startsWith('INVALID_TAG_IDS:')) {
                const missing = errMessage.replace('INVALID_TAG_IDS:', '');
                logConsole('PUT', `/blog/${req.params.slug}`, 'WARN', `Invalid tag ids`, { slug: req.params.slug, missing });
                writeToLog(`BlogRoute UPDATE invalid tags slug=${req.params.slug} missing=${missing}`, 'blog');
                return res.error(`invalid tag ids: ${missing}`, 400);
            }

            if (errMessage === 'INVALID_AUTHOR') {
                logConsole('PUT', `/blog/${req.params.slug}`, 'WARN', `Invalid author id`, { slug: req.params.slug, authorId });
                writeToLog(`BlogRoute UPDATE invalid author slug=${req.params.slug} author=${authorId}`, 'blog');
                return res.error('invalid author id', 400);
            }

            if (errMessage.includes('UNIQUE constraint failed')) {
                logConsole('PUT', `/blog/${req.params.slug}`, 'WARN', `Slug already exists`, { slug: req.params.slug, newSlug });
                writeToLog(`BlogRoute UPDATE duplicate newSlug=${newSlug}`, 'blog');
                return res.error('slug already exists', 409);
            }

            logConsole('PUT', `/blog/${req.params.slug}`, 'FAIL', `Error updating blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute UPDATE error slug=${req.params.slug}`, 'blog');

            return res.error("error updating blog post", 500, error);
        }
    }, 
responseHandler);

/** * PUT /edit/publish/:slug - Publish or unpublish blog post
 * Update the published status of a blog post
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.put('/edit/publish/:slug', 
    rateLimiter, 
    [
        param('slug').notEmpty().withMessage('Slug is required'),
        body('publish').isBoolean().withMessage('Publish must be a boolean')
    ],
    validateRequest,
    authenticateToken,
    async (req: Request<{ slug: string }>, res: Response) => {
        const { publish } = req.body;
        try {
            const updatedPost = await BlogService.publishedPostBySlug(req.params.slug, publish);

            if (!updatedPost) {
                logConsole('PUT', `/blog/publish/${req.params.slug}`, 'WARN', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute PUBLISH not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('PUT', `/blog/publish/${req.params.slug}`, 'OK', `Updated publish status for blog post`, { slug: req.params.slug, publish });
            writeToLog(`BlogRoute PUBLISH ok slug=${req.params.slug}`, 'blog');

            return res.success({ post: updatedPost }, `post (${req.params.slug}) publish status updated successfully`);
        } catch (error) {
            logConsole('PUT', `/blog/publish/${req.params.slug}`, 'FAIL', `Error updating publish status for blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute PUBLISH error slug=${req.params.slug}`, 'blog');

            return res.error("error updating blog post publish status", 500, error);
        }
    }, 
responseHandler);

/**
 * PUT /edit/indexed/:slug - Set indexed status for blog post
 * Update the indexed status of a blog post
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.put('/edit/indexed/:slug', 
    rateLimiter, 
    [
        param('slug').notEmpty().withMessage('Slug is required'),
        body('indexed').isInt({ min: 0, max: 1 }).withMessage('Indexed must be 0 or 1')
    ],
    validateRequest,
    authenticateToken,
    async (req: Request<{ slug: string }>, res: Response) => {
        const { indexed } = req.body;
        try {
            const updatedPost = await BlogService.indexedPostBySlug(req.params.slug, indexed);

            if (!updatedPost) {
                logConsole('PUT', `/blog/indexed/${req.params.slug}`, 'WARN', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute INDEXED not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('PUT', `/blog/indexed/${req.params.slug}`, 'OK', `Updated indexed status for blog post`, { slug: req.params.slug, indexed });
            writeToLog(`BlogRoute INDEXED ok slug=${req.params.slug}`, 'blog');

            return res.success({ post: updatedPost }, `post (${req.params.slug}) indexed status updated successfully`);
        } catch (error) {
            logConsole('PUT', `/blog/indexed/${req.params.slug}`, 'FAIL', `Error updating indexed status for blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute INDEXED error slug=${req.params.slug}`, 'blog');

            return res.error("error updating blog post indexed status", 500, error);
        }
    }, 
responseHandler);

/**
 * DELETE /:slug - Delete blog post by slug
 * Delete a blog post by its slug
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.delete('/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    authenticateToken,
    async (req: Request<{ slug: string }>, res: Response, next) => {
        try {
            const deleted = await BlogService.deletePostBySlug(req.params.slug);
            if (!deleted) {
                logConsole('DELETE', `/blog/${req.params.slug}`, 'WARN', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute DELETE not found slug=${req.params.slug}`, 'blog');
                return res.success({}, `post (${req.params.slug}) not found or already deleted`);
            }

            logConsole('DELETE', `/blog/${req.params.slug}`, 'OK', `Deleted blog post`, { slug: req.params.slug });
            writeToLog(`BlogRoute DELETE ok slug=${req.params.slug}`, 'blog');

            return res.removed(req.params.slug, `post (${req.params.slug}) deleted successfully`);
        } catch (error) {
            logConsole('DELETE', `/blog/${req.params.slug}`, 'FAIL', `Error deleting blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute DELETE error slug=${req.params.slug}`, 'blog');

            return res.error("error deleting blog post", 500, error);
        }
    }, 
responseHandler);

/**
 * DELETE /cache/delete/:slug - Delete blog post cache by slug
 * Delete the cached version of a blog post by its slug
 *  @param req Express Request object
 *  @param res Express Response object
 */
BlogRoute.delete('/cache/delete/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    authenticateToken,
    async (req: Request<{ slug: string }>, res: Response, next) => {
        try {
            const deleted = await BlogService.deleteCacheBySlug(req.params.slug);
            if (!deleted) {
                logConsole('DELETE', `/blog/cache/${req.params.slug}`, 'WARN', `Cache not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute CACHE DELETE not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `cache for post (${req.params.slug}) not found`);
            }

            logConsole('DELETE', `/blog/cache/${req.params.slug}`, 'OK', `Deleted cache for blog post`, { slug: req.params.slug });
            writeToLog(`BlogRoute CACHE DELETE ok slug=${req.params.slug}`, 'blog');

            return res.removed(req.params.slug, `cache for post (${req.params.slug}) deleted successfully`);
        } catch (error) {
            logConsole('DELETE', `/blog/cache/${req.params.slug}`, 'FAIL', `Error deleting cache for blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute CACHE DELETE error slug=${req.params.slug}`, 'blog');

            return res.error("error while deleting blog post cache", 500, error);
        }}, 
responseHandler);

BlogRoute.delete('/cache/clear/',
    rateLimiter,
    authenticateToken,
    async (req, res, next) => {
        try {
            await BlogService.clearAllCache();

            logConsole('DELETE', `/blog/cache/clear/all`, 'OK', `Cleared all blog cache`);
            writeToLog(`BlogRoute CACHE CLEAR ALL ok`, 'blog');

            return res.success({}, `all blog cache cleared successfully`);
        } catch (error) {
            logConsole('DELETE', `/blog/cache/clear/all`, 'FAIL', `Error clearing all blog cache`, { error });
            writeToLog(`BlogRoute CACHE CLEAR ALL error`, 'blog');

            return res.error("error while clearing all blog cache", 500, error);
        }}, 
responseHandler);

export default BlogRoute;