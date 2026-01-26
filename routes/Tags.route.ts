// express
import express, { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';

// service
import { TagService } from '../services/Tag.service';

// middlewares
import rateLimiter from '../middlewares/rateLimiter.middlewar';
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { asyncHandler } from '../middlewares/errorHandler.middleware';

// syteme
import { authenticateToken, HybridAuthenticateToken } from '../middlewares/authenticateToken.middlewar';


const TagRouter: Router = express.Router({ mergeParams: true });

TagRouter.use(rateLimiter);

/**
 * GET / - Get all tags
 * Retrieves all tags.
 *  @param req Express Request object
 *  @param res Express Response object
 */
TagRouter.get('/',
    rateLimiter,
    HybridAuthenticateToken,
    async (req: Request, res: Response) => {
        try {
            const isAuthenticated = !!(req as any).user;
            const tags = await TagService.getAllTags(isAuthenticated);
            logConsole('TagRouter', 'GET /', 'OK', `Retrieved all tags. auth=${isAuthenticated}`);
            writeToLog(`Retrieved all tags. auth=${isAuthenticated}`, "tags");
            return res.success(tags.tags);
        } catch (error: any) {
            logConsole('TagRouter', 'GET /', 'FAIL', error.message);
            writeToLog(`Failed to retrieve tags: ${error.message}`, "tags");
            return res.error('Failed to retrieve tags.', 500);
        }
});

/**
 * GET /:slug - Get tag by slug
 * Retrieves a tag by its slug.
 *  @param req Express Request object
 *  @param res Express Response object
 */
TagRouter.get('/:slug', 
    rateLimiter,
    HybridAuthenticateToken,
    [
        param('slug').isString().notEmpty(),
    ],
    validateRequest,
    asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
        const { slug } = req.params;
        const isAuthenticated = !!(req as any).user;
        const tag = await TagService.getTagBySlug(slug, isAuthenticated);
        logConsole('TagRouter', `GET /${slug}`, 'OK', `Retrieved tag with slug: ${slug}. auth=${isAuthenticated}`);
        return res.success(tag);
    })
);

/**
 * DELETE /:slug - Delete tag by slug
 * Deletes a tag by its slug.
 *  @param req Express Request object
 *  @param res Express Response object
 */
TagRouter.delete('/:slug', 
    rateLimiter,
    authenticateToken,
    [
        param('slug').isString().notEmpty(),
    ],
    validateRequest,
    asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
        const { slug } = req.params;
        await TagService.deleteTagBySlug(slug);
        logConsole('TagRouter', `DELETE /${slug}`, 'OK', `Deleted tag with slug: ${slug}.`);
        writeToLog(`Deleted tag with slug: ${slug}.`, "tags");
        return res.removed(slug, 'Tag deleted successfully.');
    })
);

/**
 * POST / - Create a new tag
 * Creates a new tag.
 *  @param req Express Request object
 *  @param res Express Response object
 */
TagRouter.post('/',
    rateLimiter,
    authenticateToken,
    [
        body('name').isString().notEmpty().trim(),
        body('slug').isString().notEmpty().trim().matches(/^[a-z0-9-]+$/),
        body('color').isString().notEmpty().matches(/^#[0-9A-F]{6}$/i).withMessage('Color must be a valid hex color (#XXXXXX)'),
    ],
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
        const { name, slug, color } = req.body;
        const newTag = await TagService.createTag(name, slug, color);
        logConsole('TagRouter', 'POST /', 'OK', `Created new tag with slug: ${slug}.`);
        writeToLog(`Created new tag with slug: ${slug}.`, "tags");
        return res.success(newTag, 'Tag created successfully.');
    })
);

/**
 * PUT /:slug - Update tag by slug
 * Updates a tag's name and/or color by its slug.
 *  @param req Express Request object
 *  @param res Express Response object
 */
TagRouter.put('/:slug',
    rateLimiter,
    authenticateToken,
    [
        param('slug').isString().notEmpty(),
        body('name').optional().isString().trim(),
        body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color must be a valid hex color (#XXXXXX)'),
    ],
    validateRequest,
    asyncHandler(async (req: Request<{ slug: string }>, res: Response) => {
        const { slug } = req.params;
        const { name, color } = req.body;
        const updatedTag = await TagService.updateTagBySlug(slug, { name, color });
        logConsole('TagRouter', `PUT /${slug}`, 'OK', `Updated tag with slug: ${slug}.`);
        writeToLog(`Updated tag with slug: ${slug}.`, "tags");
        return res.success(updatedTag, 'Tag updated successfully.');
    })
);


export default TagRouter;
