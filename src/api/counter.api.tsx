import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

//type
interface ICounterRequest{
    counterName: string;
}

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn(...args);
};


export async function getCounter({counterName}: ICounterRequest): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get<IApiResponse>(
            `${ApiBaseUrl}/counter/get/${counterName}`,
        );
        return resp.data.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message:
                    'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
                status: 429,
            };
        }

        logDev('getCounter error', err);
        return null;
    }
}

export async function incrementCounter({counterName}: ICounterRequest): Promise<IApiResponse | null> {
    try {
        const resp = await axios.post<IApiResponse>(
            `${ApiBaseUrl}/counter/increment/${counterName}`,
        );
        return resp.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message:
                    'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
                status: 429,
            };
        }

        logDev('incrementCounter error', err);
        return null;
    }
}
