// express
import express, { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';

// service
import { TagService } from '../services/Tag.service';

// middlewares
import rateLimiter from '../middlewares/rateLimiter.middlewar';
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';

// syteme
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';


const TagRouter: Router = express.Router({ mergeParams: true });

TagRouter.use(rateLimiter);

TagRouter.get('/',
    rateLimiter,
    async (req: Request, res: Response) => {
        try {
            const tags = await TagService.getAllTags();
            logConsole('TagRouter', 'GET /', 'OK', 'Retrieved all tags.');
            writeToLog(`Retrieved all tags.`, "tags");
            
            return res.success(tags);
        } catch (error: any) {
            logConsole('TagRouter', 'GET /', 'FAIL', error.message);
            writeToLog(`Failed to retrieve tags: ${error.message}`, "tags");
            return res.error('Failed to retrieve tags.', 500);
        }
});

TagRouter.get('/:slug', 
    rateLimiter,
    [
        param('slug').isString().notEmpty(),
    ],
    validateRequest,
    async (req: Request<{ slug: string }>, res: Response) => {
        const { slug } = req.params;

        try {
            const tag = await TagService.getTagBySlug(slug);
            if (!tag) {
                logConsole('TagRouter', `GET /${slug}`, 'FAIL', `Tag with slug: ${slug} not found.`);
                writeToLog(`Tag with slug: ${slug} not found.`, "tags");
                return res.error('Tag not found.', 404);
            }
            logConsole('TagRouter', `GET /${slug}`, 'OK', `Retrieved tag with slug: ${slug}.`);
            return res.success(tag);
        } catch (error: any) {
            logConsole('TagRouter', `GET /${slug}`, 'FAIL', error.message);
            writeToLog(`Failed to retrieve tag with slug: ${slug}: ${error.message}`, "tags");
            return res.error('Failed to retrieve tag.', 500);
        }
});

TagRouter.delete('/:slug', 
    rateLimiter,
    authenticateToken,
    [
        param('slug').isString().notEmpty(),
    ],
    validateRequest,
    async (req: Request<{ slug: string }>, res: Response) => {
        const { slug } = req.params;

        try {
            TagService.deleteTagBySlug(slug);
            logConsole('TagRouter', `DELETE /${slug}`, 'OK', `Deleted tag with slug: ${slug}.`);
            writeToLog(`Deleted tag with slug: ${slug}.`, "tags");
            return res.success({ message: 'Tag deleted successfully.' });
        } catch (error: any) {
            logConsole('TagRouter', `DELETE /${slug}`, 'FAIL', error.message);
            writeToLog(`Failed to delete tag with slug: ${slug}: ${error.message}`, "tags");
            return res.error('Failed to delete tag.', 500);
        }
});

TagRouter.post('/',
    rateLimiter,
    authenticateToken,
    [
        body('name').isString().notEmpty(),
        body('slug').isString().notEmpty(),
        body('color').isString().notEmpty(),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, slug, color } = req.body;

        try {
            const newTag = await TagService.createTag(name, slug, color);
            logConsole('TagRouter', 'POST /', 'OK', `Created new tag with slug: ${slug}.`);
            writeToLog(`Created new tag with slug: ${slug}.`, "tags");
            return res.success(newTag, 'Tag created successfully.');
        } catch (error: any) {
            logConsole('TagRouter', 'POST /', 'FAIL', error.message);
            writeToLog(`Failed to create tag: ${error.message}`, "tags");
            return res.error('Failed to create tag.', 500);
        }
    }
);


export default TagRouter;
