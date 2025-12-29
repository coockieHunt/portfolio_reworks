//express
import express, { Request, Response, Router } from 'express';

//validators
import { body, param, query, check } from 'express-validator';

// services
import { BlogService } from '../services/Blog.service';

// middlewares
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../middlewares/responseHandler.middlewar';
import { writeToLog, logConsole } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';

const BlogRoute: Router = express.Router({ mergeParams: true });

BlogRoute.post('/', 
    rateLimiter, 
    [
        body('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        body('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    try {
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const limit = req.body.limit ? parseInt(req.body.limit) : 20;

        const data = await BlogService.getAllPosts(page, limit);
        
        logConsole('GET', '/blog/', 'OK', `Retrieved blog posts`, { count: data.posts.length, page });
        writeToLog(`BlogRoute READ ok count=${data.posts.length} page=${page}`, 'blog');
        return res.success(data);
    } catch (error) {
        logConsole('GET', '/blog/', 'FAIL', `Error retrieving blog posts`, { error });
        writeToLog(`BlogRoute READ error`, 'blog');
        return res.error("error retrieving blog posts", 500, error);
    }
}, responseHandler);

// GET
BlogRoute.get('/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    authenticateToken,
    async (req: Request, res: Response) => {
        try {
            const data = await BlogService.getPostBySlug(req.params.slug);
            if (!data.data) {
                logConsole('GET', `/blog/${req.params.slug}`, 'FAIL', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute READ not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('GET', `/blog/${req.params.slug}`, 'OK', `Retrieved blog post `, { slug: req.params.slug });
            writeToLog(`BlogRoute READ ok slug=${req.params.slug}`, 'blog');

            return res.success(data);
        } catch (error) {
            logConsole('GET', `/blog/${req.params.slug}`, 'FAIL', `Error retrieving blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute READ error slug=${req.params.slug}`, 'blog');

            return res.error("error retrieving blog post", 500, error);
        }
    }, 
responseHandler);

// NEW
BlogRoute.post('/new', 
    rateLimiter, 
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('slug').notEmpty().withMessage('Slug is required'),
        body('content').notEmpty().withMessage('Content is required'),
        body('summary').optional().isString().withMessage('Summary must be a string'),
        body('authorId').notEmpty().withMessage('Author ID is required')
    ],
    validateRequest,
    authenticateToken,
    async (req: Request, res: Response) => {
        const { title, slug, content, summary, authorId } = req.body;

        try {
            const newPost = await BlogService.createPost({ title, slug, content, summary, authorId });
            logConsole('POST', '/blog/', 'OK', `Created new blog post`, { slug });
            writeToLog(`BlogRoute CREATE ok slug=${slug}`, 'blog');

            return res.success({ message: "blog post created successfully", post: newPost })
        } catch (error) {
            if((error as any).message.includes('UNIQUE constraint failed')) {
                logConsole('POST', '/blog/', 'FAIL', `Slug already exists`, { slug: req.body.slug });
                writeToLog(`BlogRoute CREATE duplicate slug=${req.body.slug}`, 'blog');

                return res.error("slug already exists", 409);
            }

            logConsole('POST', '/blog/', 'FAIL', `Error creating new blog post`, { error, slug: req.body.slug });
            writeToLog(`BlogRoute CREATE error slug=${req.body.slug}`, 'blog');

            return res.error("error creating blog post", 500, error);
        }
    }, 
responseHandler);

//PUT
BlogRoute.put('/edit/update/:slug', 
    rateLimiter, 
    [
        param('slug').notEmpty().withMessage('Slug is required'),
        body('title').optional().isString(),
        body('content').optional().isString(),
        body('summary').optional().isString(),
        body('authorId').optional().isNumeric()
    ],
    validateRequest,
    authenticateToken,
    async (req: Request, res: Response) => {
        const { title, content, summary, authorId } = req.body;
        console.log( title, content, summary, authorId );
        try {
            const updatedPost = await BlogService.updatePostBySlug(req.params.slug, { title, content, summary, authorId });

            if (!updatedPost) {
                logConsole('PUT', `/blog/${req.params.slug}`, 'FAIL', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute UPDATE not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('PUT', `/blog/${req.params.slug}`, 'OK', `Updated blog post`, { slug: req.params.slug });
            writeToLog(`BlogRoute UPDATE ok slug=${req.params.slug}`, 'blog');

            return res.success({ message: `post (${req.params.slug}) updated successfully`, post: updatedPost });
        } catch (error) {
            logConsole('PUT', `/blog/${req.params.slug}`, 'FAIL', `Error updating blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute UPDATE error slug=${req.params.slug}`, 'blog');

            return res.error("error updating blog post", 500, error);
        }
    }, 
responseHandler);

BlogRoute.put('/edit/publish/:slug', 
    rateLimiter, 
    [
        param('slug').notEmpty().withMessage('Slug is required'),
        body('publish').isBoolean().withMessage('Publish must be a boolean')
    ],
    validateRequest,
    authenticateToken,
    async (req: Request, res: Response) => {
        const { publish } = req.body;
        try {
            const updatedPost = await BlogService.publishedPostBySlug(req.params.slug, publish);

            if (!updatedPost) {
                logConsole('PUT', `/blog/publish/${req.params.slug}`, 'FAIL', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute PUBLISH not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
            }

            logConsole('PUT', `/blog/publish/${req.params.slug}`, 'OK', `Updated publish status for blog post`, { slug: req.params.slug, publish });
            writeToLog(`BlogRoute PUBLISH ok slug=${req.params.slug}`, 'blog');

            return res.success({ message: `post (${req.params.slug}) publish status updated successfully`, post: updatedPost,  });
        } catch (error) {
            logConsole('PUT', `/blog/publish/${req.params.slug}`, 'FAIL', `Error updating publish status for blog post`, { error, slug: req.params.slug });
            writeToLog(`BlogRoute PUBLISH error slug=${req.params.slug}`, 'blog');

            return res.error("error updating blog post publish status", 500, error);
        }
    }, 
responseHandler);

// DELETE
BlogRoute.delete('/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    authenticateToken,
    async (req, res, next) => {
        try {
            const deleted = await BlogService.deletePostBySlug(req.params.slug);

            if (!deleted) {
                logConsole('DELETE', `/blog/${req.params.slug}`, 'FAIL', `Post not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute DELETE not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
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

BlogRoute.delete('/cache/delete/:slug', 
    rateLimiter, 
    param('slug').notEmpty().withMessage('Slug is required'),
    validateRequest,
    authenticateToken,
    async (req, res, next) => {
        try {
            const deleted = await BlogService.deleteCacheBySlug(req.params.slug);
            if (!deleted) {
                logConsole('DELETE', `/blog/cache/${req.params.slug}`, 'FAIL', `Cache not found`, { slug: req.params.slug });
                writeToLog(`BlogRoute CACHE DELETE not found slug=${req.params.slug}`, 'blog');
                return res.idNotFound(req.params.slug, `post (${req.params.slug}) not found`);
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

            return res.success({ message: `all blog cache cleared successfully` });
        } catch (error) {
            logConsole('DELETE', `/blog/cache/clear/all`, 'FAIL', `Error clearing all blog cache`, { error });
            writeToLog(`BlogRoute CACHE CLEAR ALL error`, 'blog');

            return res.error("error while clearing all blog cache", 500, error);
        }}, 
responseHandler);

export default BlogRoute;