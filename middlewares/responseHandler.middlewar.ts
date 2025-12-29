// request
import { Request, Response, NextFunction } from 'express';

// types
import { ApiResponse } from '../types/api';

/**
 ** Middleware to standardize API responses.
 ** Adds res.success and res.error methods for consistent response formatting.
 *  @param req Express Request object
 *  @param res Express Response object
 *  @param next Express NextFunction
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
        console.log('----------------------------------------');
        return res.status(statusCode).json(response);
    };

    // if success
    res.success = (data: any, message: string = 'Success', statusCode: number = 200) => {
        return res.standard(statusCode, data, message);
    };

    // if error
    res.error = (message: string = 'Error', statusCode: number = 500, error: any = null) => {
        const response: ApiResponse = {
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error : undefined, 
            timestamp: new Date().toISOString(),
        };
        console.log('----------------------------------------');
        return res.status(statusCode).json(response);
    };

    // if id not found
    res.idNotFound = (id: number | string, message: string = 'Id not found') => {
        const response: ApiResponse = {
            success: false,
            message,
            meta: {
                id
            },
            timestamp: new Date().toISOString(),
        };
        console.log('----------------------------------------');
        return res.status(404).json(response);
    };

    // if unauthorized
    res.unauthorized = (message: string = 'Unauthorized') => {
        const response: ApiResponse = {
            success: false,
            message,
            timestamp: new Date().toISOString(),
        };
        console.log('----------------------------------------');
        return res.status(401).json(response);
    };

    // if added
    res.added = (id: number | string, message: string = 'Added successfully') => {
        const response: ApiResponse = {
            success: true,
            message,
            meta: {
                id
            },
            timestamp: new Date().toISOString(),
        };
        console.log('----------------------------------------');
        return res.status(201).json(response);
    };

    // if removed
    res.removed = (id: number | string, message: string = 'Removed successfully') => {
        const response: ApiResponse = {
            success: true,
            message,
            meta: {
                id
            },
            timestamp: new Date().toISOString(),
        };
        console.log('----------------------------------------');
        return res.status(200).json(response);
    };

    next();
};