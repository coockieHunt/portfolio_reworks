export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: any;
    timestamp: string;
}

declare global {
    namespace Express {
        interface Response {
            standard(statusCode: number, data?: any, message?: string): void;
            success(data: any, message?: string, statusCode?: number): void;
            error(message: string, statusCode?: number, error?: any): void;
        }
    }
}