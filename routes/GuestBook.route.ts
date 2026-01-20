// express
import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';

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
 ** POST /read - Retrieve guestbook entries with pagination
 ** read the guestbook entries.
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.post('/read', 
    rateLimiter, 
    [
        body('password').custom((value) => {
            if (!value || value !== secretConfig.password) {
                logConsole('POST', '/guestbook/', 'FAIL', 'Unauthorized access attempt');
                writeToLog('GuestBookRoute READ unauthorized access attempt', 'secret');
                throw new Error('Unauthorized');
            }
            return true;
        }),
        body('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        body('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1;
            const limit = req.body.limit ? parseInt(req.body.limit) : 20;

            const guestBookResponse = await GuestBookService.getGuestBookEntries(page, limit);
            
            logConsole('POST', '/guestbook/', 'INFO', `Retrieved guestbook entries`, { count: guestBookResponse.entries.length, page: page });
            writeToLog(`GuestBookRoute READ ok page=${page} count=${guestBookResponse.entries.length}`, 'guestbook');
            return res.success(guestBookResponse);
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', '/guestbook/', 'FAIL', 'Error retrieving guestbook entries', { error: errorMsg });
            return res.error('Internal Server Error', 500);
        }
    }
);

/**
 ** POST /write - Add new entry
 ** write entry to guestbook
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.post('/write', 
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
 ** POST /delete - Delete guestbook entry
 ** Delete an entry from the guestbook by ID
 *  @param req Express Request object
 *  @param res Express Response object
 */
guestBookRoute.delete('/delete',
    rateLimiter,
    authenticateToken,
    [
        body('password').custom((value) => {
            if (!value || value !== secretConfig.password) {
                logConsole('POST', '/guestbook/delete', 'FAIL', 'Unauthorized access attempt');
                writeToLog('GuestBookRoute DELETE unauthorized access attempt', 'secret');
                throw new Error('Unauthorized');
            }
            return true;
        }),
        body('id').notEmpty().withMessage('ID is required')
            .isString().withMessage('ID must be a string')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            
            const deleted = await GuestBookService.deleteGuestBookEntry(id);
            
            if(deleted.success) {
                logConsole('POST', '/guestbook/delete', 'OK', 'Deleted guestbook entry', { id: id });
                writeToLog(`GuestBookRoute DELETE ok id=${id}`, 'guestbook');
                return res.removed(id, 'Guestbook entry deleted successfully');
            }

            logConsole('POST', '/guestbook/delete', 'WARN', 'Not found', { id: id });
            writeToLog(`GuestBookRoute DELETE not found id=${id}`, 'guestbook');
            return res.idNotFound(id, 'Guestbook entry not found');
        } catch (error: any) {
            const errorMsg = error.stack || error.message || String(error);
            logConsole('POST', '/guestbook/delete', 'FAIL', 'Error deleting guestbook entry', { error: errorMsg });
            return res.error('Internal Server Error', 500);
        }
    }
);

export default guestBookRoute;