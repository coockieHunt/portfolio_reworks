import express, { Router, Request, Response } from 'express';
import MailController from './mail.controller';
import { MailValidator } from './mail.validator';
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../../middlewares/responseHandler.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const MailRoute: Router = express.Router({ mergeParams: true });

/**
 * POST /sendEmail
 * Handles sending contact emails from the portfolio.
 * @param req Express Request object
 * @param res Express Response object
 */
MailRoute.post(
	'/sendEmail',
	rateLimiter,
	MailValidator.sendEmail,
	validateRequest,
	asyncHandler(MailController.sendEmail),
	responseHandler
);

export default MailRoute;
