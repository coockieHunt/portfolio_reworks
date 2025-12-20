// request
import { Request, Response, NextFunction } from 'express';

// types
import { ApiResponse } from '../types/api';

/**
 * Express middleware to standardize API responses.
 *
 * Adds custom response methods to the `res` object:
 * - `res.standard`: Sends a standardized response with a given status code, data, and message.
 * - `res.success`: Sends a successful response with data and an optional message and status code.
 * - `res.error`: Sends an error response with a message, status code, and optional error details (included only in development).
 *
 * @param req - Express request object.
 * @param res - Express response object, extended with custom response methods.
 * @param next - Express next middleware function.
 */
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
    // wrap response methods
    res.standard = (statusCode: number, data: any = null, message: string = '') => {
        const response: ApiResponse = {
            success: statusCode >= 200 && statusCode < 300,
            message,
            data,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };

    //succes response
    res.success = (data: any, message: string = 'Success', statusCode: number = 200) => {
        return res.standard(statusCode, data, message);
    };

    //error response
    res.error = (message: string = 'Error', statusCode: number = 500, error: any = null) => {
        const response: ApiResponse = {
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error : undefined, // only include error details in development
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };

    next();
};