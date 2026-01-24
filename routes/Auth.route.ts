//express
import express, { Request, Response, Router } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';
import { asyncHandler } from '../middlewares/errorHandler.middleware';
import { AuthService } from '../services/Auth.service';
import { logConsole, writeToLog } from '../middlewares/log.middlewar';
import { AuthError } from '../utils/AppError';


const AuthRoute: Router = express.Router({ mergeParams: true });

AuthRoute.post('/login', 
    rateLimiter,
    [
        body('password').notEmpty().withMessage('Password is required')
    ],
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
        const { password } = req.body;

        const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string);

        if (!match) {
            throw new AuthError('Invalid credentials');
        }

        const tokenSign = jwt.sign(
            { name: process.env.USER_ID || 'admin' }, 
            process.env.ACCESS_TOKEN_SECRET as string, 
            { expiresIn: '24h' }
        );
        logConsole("POST", "/auth/login", "OK", "User logged in successfully");
        writeToLog("Login successful", "auth");
        return res.success({ token: tokenSign }, 'Login successful');
    })
);

AuthRoute.post('/logout', 
    authenticateToken,
    asyncHandler(async (req: Request, res: Response) => {
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            throw new AuthError('No token provided');
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        const isRevoked = await AuthService.isTokenRevoked(token);
        if (isRevoked) {
            logConsole("POST", "/auth/logout", "WARN", "Token already revoked", { token });
            throw new AuthError('Token already revoked');
        }

        await AuthService.revokeToken(token);
        logConsole("POST", "/auth/logout", "OK", "Token revoked successfully", { token });
        writeToLog("Logout successful", "auth");
        return res.success({}, 'Logout successful');
    })
);


export default AuthRoute;