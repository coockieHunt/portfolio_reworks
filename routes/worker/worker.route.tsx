import express, { Router } from 'express';
import workerController from './worker.controller';
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { authenticateToken } from '../../middlewares/authenticateToken.middlewar';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const WorkerRoute: Router = express.Router({ mergeParams: true });

WorkerRoute.get(
    '/cache',
    rateLimiter,
    authenticateToken,
    asyncHandler(workerController.buildCache)
);

export default WorkerRoute;
