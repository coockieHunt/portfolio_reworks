//express
import express, { Router } from 'express';

//controllers
import AuthController from './auth.controller';

//validators
import { AuthValidator } from './auth.validator';

// middlewares
import { rateLimiter } from '../../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../../middlewares/responseHandler.middlewar';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { authenticateToken } from '../../middlewares/authenticateToken.middlewar';
import { asyncHandler } from '../../middlewares/errorHandler.middleware';

const AuthRoute: Router = express.Router({ mergeParams: true });

/**
 * POST /login - User login
 * Authenticate user and provide a JWT token
 *  @param req Express Request object
 *  @param res Express Response object
 */
AuthRoute.post('/login', 
    rateLimiter,
    AuthValidator.login,
    validateRequest,
    asyncHandler(AuthController.login),
    responseHandler
);

/**
 * POST /logout - User logout
 * Revoke the JWT token to log out the user
 *  @param req Express Request object
 *  @param res Express Response object
 */
AuthRoute.post('/logout', 
    authenticateToken,
    AuthValidator.logout,
    asyncHandler(AuthController.logout),
    responseHandler
);

export default AuthRoute;