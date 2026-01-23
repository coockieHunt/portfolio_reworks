// express
import express, { Request, Response, Router } from 'express';
import { body, query, param } from 'express-validator';

// config
import cfg from '../config/default';

// middlewares
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { validateRequest } from '../middlewares/validateRequest.middleware';

// services
import { GuestBookService } from '../services/GuestBook.service';
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';

const guestBookRoute: Router = express.Router();
const secretConfig = cfg.SecretSystem;

/**
 ** GET / - Retrieve guestbook entries with pagination
 ** read the guestbook entries.
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.get('/', 
    rateLimiter, 
    [
        query('password').custom((value) => {
            if (!value || value !== secretConfig.password) {
                logConsole('GET', '/guestbook/', 'FAIL', 'Unauthorized access attempt');
                writeToLog('GuestBookRoute READ unauthorized access attempt', 'secret');
                throw new Error('Unauthorized');
            }
            return true;
        }),
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

            const guestBookResponse = await GuestBookService.getGuestBookEntries(page, limit);
            
            logConsole('GET', '/guestbook/', 'INFO', `Retrieved guestbook entries`, { count: guestBookResponse.entries.length, page: page });
            writeToLog(`GuestBookRoute READ ok page=${page} count=${guestBookResponse.entries.length}`, 'guestbook');
            return res.success(guestBookResponse);
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('GET', '/guestbook/', 'FAIL', 'Error retrieving guestbook entries', { error: errorMsg });
            return res.error('Internal Server Error', 500);
        }
    }
);

/**
 ** POST / - Add new entry
 ** write entry to guestbook
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.post('/', 
    rateLimiter, 
    [
        body('password').custom((value) => {
            if (!value || value !== secretConfig.password) {
                logConsole('POST', '/guestbook/', 'FAIL', 'Unauthorized access attempt');
                writeToLog('GuestBookRoute WRITE unauthorized access attempt', 'secret');
                throw new Error('Unauthorized');
            }
            return true;
        }),
        body('name').notEmpty().withMessage('Name is required')
            .isLength({ max: 50 }).withMessage('Name length must not exceed 50 characters')
            .custom((value) => {
                const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]{2,}\.(com|net|org|fr|info|be)\b)/i;
                if (urlRegex.test(value)) {
                    logConsole('POST', '/guestbook/', 'WARN', `URL detected in name`);
                    writeToLog(`GuestBook WRITE validation failed: URL detected in name`, 'guestbook');
                    throw new Error('url detected in input');
                }
                const htmlRegex = /<[^>]*>/;
                if (htmlRegex.test(value)) {
                    logConsole('POST', '/guestbook/', 'WARN', 'HTML tags detected in input');
                    writeToLog('GuestBook WRITE validation failed: HTML tags detected', 'guestbook');
                    throw new Error('HTML tags detected in input');
                }
                return true;
            }),
        body('message').notEmpty().withMessage('Message is required')
            .isLength({ max: 500 }).withMessage('Message length must not exceed 500 characters')
            .custom((value) => {
                const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]{2,}\.(com|net|org|fr|info|be)\b)/i;
                if (urlRegex.test(value)) {
                    logConsole('POST', '/guestbook/', 'WARN', `URL detected in message`);
                    writeToLog(`GuestBook WRITE validation failed: URL detected in message`, 'guestbook');
                    throw new Error('url detected in input');
                }
                const htmlRegex = /<[^>]*>/;
                if (htmlRegex.test(value)) {
                    logConsole('POST', '/guestbook/', 'WARN', 'HTML tags detected in input');
                    writeToLog('GuestBook WRITE validation failed: HTML tags detected', 'guestbook');
                    throw new Error('HTML tags detected in input');
                }
                return true;
            })
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { name, message } = req.body;
            
            const newEntry = await GuestBookService.addGuestBookEntry(name, message);
            
            logConsole('POST', '/guestbook/', 'OK', 'Added new guestbook entry', { by: name, len: message.length, id: newEntry.id });
            writeToLog(`GuestBookRoute WRITE ok by=${name} len=${message.length} id=${newEntry.id}`, 'guestbook');
            
            return res.success({ 
                id: newEntry.id,
                new_entry: newEntry
            }, 'Guestbook entry added successfully');
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', '/guestbook/', 'FAIL', 'Error adding guestbook entry', { error: errorMsg });
            return res.error('Internal Server Error', 500);
        }
    }
);

/**
 ** DELETE /:id - Delete guestbook entry
 ** Delete an entry from the guestbook by ID
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.delete('/:id',
    rateLimiter,
    authenticateToken,
    [
        query('password').custom((value) => {
            if (!value || value !== secretConfig.password) {
                logConsole('DELETE', '/guestbook/', 'FAIL', 'Unauthorized access attempt');
                writeToLog('GuestBookRoute DELETE unauthorized access attempt', 'secret');
                throw new Error('Unauthorized');
            }
            return true;
        }),
        param('id').notEmpty().withMessage('ID is required').isString()
    ],
    validateRequest,
    async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { id } = req.params;
            
            const deleted = await GuestBookService.deleteGuestBookEntry(id);
            
            if(deleted.success) {
                logConsole('DELETE', `/guestbook/${id}`, 'OK', 'Deleted guestbook entry', { id: id });
                writeToLog(`GuestBookRoute DELETE ok id=${id}`, 'guestbook');
                return res.removed(id, 'Guestbook entry deleted successfully');
            }

            logConsole('DELETE', `/guestbook/${id}`, 'WARN', 'Not found', { id: id });
            writeToLog(`GuestBookRoute DELETE not found id=${id}`, 'guestbook');
            return res.idNotFound(id, 'Guestbook entry not found');
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('DELETE', `/guestbook/${req.params.id}`, 'FAIL', 'Error deleting guestbook entry', { error: errorMsg });
            return res.error('Internal Server Error', 500);
        }
    }
);

export default guestBookRoute;