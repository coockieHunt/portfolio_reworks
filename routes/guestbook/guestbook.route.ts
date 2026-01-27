import express, { Router } from 'express';
import GuestBookController from './guestbook.controller';
import { GuestBookValidator } from './guestbook.validator';
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../../middlewares/responseHandler.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { authenticateToken } from '../../middlewares/authenticateToken.middlewar';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const GuestBookRoute: Router = express.Router({ mergeParams: true });

/**
 * GET / - Retrieve guestbook entries with pagination
 * read the guestbook entries.
 *  @param req Express Request object
 *  @param res Express Response object
 */
GuestBookRoute.get('/',
	rateLimiter,
	GuestBookValidator.getAll,
	validateRequest,
	asyncHandler(GuestBookController.getAll),
	responseHandler
);

/**
 * POST / - Add new entry
 * write entry to guestbook
 *  @param req Express Request object
 *  @param res Express Response object
 */
GuestBookRoute.post('/',
	rateLimiter,
	GuestBookValidator.create,
	validateRequest,
	asyncHandler(GuestBookController.create),
	responseHandler
);

/**
 * DELETE /:id - Delete guestbook entry by ID
 * delete the guestbook entry by ID
 *  @param req Express Request object
 *  @param res Express Response object
 */
GuestBookRoute.delete('/:id',
	rateLimiter,
	authenticateToken,
	GuestBookValidator.delete,
	validateRequest,
	asyncHandler(GuestBookController.delete),
	responseHandler
);

export default GuestBookRoute;
