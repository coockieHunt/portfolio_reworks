export interface ApiResponse<T = any> {
    success: boolean;
    meta?: { [key: string]: any };
    message?: string;
    data?: T;
    error?: any;
    timestamp: string;
}

// Extend Express Response object to include standard response methods
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
        interface Response {
            standard(statusCode: number, data?: any, message?: string): this;
            success(data?: any, message?: string, statusCode?: number): this;
            created(data?: any, message?: string): this;
            error(message?: string, statusCode?: number, error?: any): this;
            idNotFound(id: number | string, message?: string): this;
            unauthorized(message?: string): this;
            added(id: number | string, message?: string): this;
            removed(id: number | string, message?: string): this;
        }
    }
}