//express
import express, { Request, Response, Router } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { AuthService } from '../services/Auth.service';
import { logConsole } from '../middlewares/log.middlewar';


const AuthRoute: Router = express.Router({ mergeParams: true });

AuthRoute.post('/login', 
    rateLimiter,
    [
        body('password').notEmpty().withMessage('Password is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { password } = req.body;

        const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string);

        if (match) {
            const tokenSign = jwt.sign(
                { name: process.env.USER_ID || 'admin' }, 
                process.env.ACCESS_TOKEN_SECRET as string, 
                { expiresIn: '24h' }
            );
            logConsole("POST", "/auth/login", "OK", "User logged in successfully");
            return res.success({ token: tokenSign }, 'Login successful');
        } else {
            logConsole("POST", "/auth/login", "FAIL", "Invalid credentials");
            return res.unauthorized('Invalid credentials');
        }
    }
);

AuthRoute.post('/logout', async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        logConsole("POST", "/auth/logout", "WARN", "No token provided");
        return res.error('not user connected', 401);
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        const isRevoked = await AuthService.isTokenRevoked(token);
        if (isRevoked) {
            logConsole("POST", "/auth/logout", "WARN", "Token already revoked", { token });
            return res.error('Token already revoked', 401);
        }

        await AuthService.revokeToken(token);
        logConsole("POST", "/auth/logout", "OK", "Token revoked successfully", { token });
        return res.success({}, 'Logout successful');
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            logConsole("POST", "/auth/logout", "FAIL", "Invalid or expired token", { error: error.message });
            return res.error('Invalid or expired token', 403);
        }
        logConsole("POST", "/auth/logout", "FAIL", "Failed to revoke token", { error });
        return res.error('Logout failed', 500);
    }
});


export default AuthRoute;