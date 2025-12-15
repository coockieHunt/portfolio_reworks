export interface IApiResponse {
    error?: boolean;
    message?: string;
    status?: number;
    [key: string]: any;
}

