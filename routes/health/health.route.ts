import express, { Router } from 'express';
import HealthController from './health.controller';
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../../middlewares/responseHandler.middlewar';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const HealthRoute: Router = express.Router({ mergeParams: true });

/**
 * GET / - Health Check Route
 * Gets the health status of the API and its dependencies.
 * @param req Express Request object
 * @param res Express Response object
 */
HealthRoute.get('/',
	rateLimiter,
	asyncHandler(HealthController.getStatus),
	responseHandler
);

export default HealthRoute;
