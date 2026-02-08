import express, { Router } from 'express';
import GatusController from './gatus.controller';
import { GatusValidator } from './gatus.validator';

import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../../middlewares/responseHandler.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const GatusRoute: Router = express.Router({ mergeParams: true });

/**
 * GET /endpoints - Get all Gatus endpoints status
 * Retrieve all monitored endpoints status from Gatus
 * @param req Express Request object
 * @param res Express Response object
 */
GatusRoute.get('/endpoints',
    rateLimiter,
    GatusValidator.getEndpoints,
    validateRequest,
    asyncHandler(GatusController.getEndpoints),
    responseHandler
);

export default GatusRoute;
