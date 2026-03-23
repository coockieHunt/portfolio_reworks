//genral
export interface IApiResponse {
    error?: boolean;
    message?: string;
    status?: number;
    [key: string]: any;
}

//counteur
export interface ICounterRequest {
    counterName: string;
}


//gatus
interface IGatusResult {
    duration: number;
    status: number;
    success: boolean;
    timestamp: string;
}

export interface IGatusEndpoint {
    group: string;
    key: string;
    name: string;
    results: IGatusResult[];
}


//health 
export interface IHealthCheckResponse {
    data: {
        database: string;
        mail: string;
        redis: string;
        status: string;
        timestamp: string;
        uptime: number;
    };
    message: string;
    success: boolean;
    timestamp: string;
}


//open graph
export interface IOpenGraphData {
    slug: string;
    title: string;
    author: string;
    lastEdit: string;
}