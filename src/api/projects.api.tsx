import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn(...args);
};

export async function getProjects(): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get(`${ApiBaseUrl}/projects/`);
        return resp.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message:
                    'Serveur surchargé. Veuillez reessayer dans quelques minutes.',
                status: 429,
            };
        }

        logDev('getProjects error', err);
        return null;
    }
}

export async function getProjectsOffset(
    min: number = 1,
    max: number = 6,
): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get(`${ApiBaseUrl}/projects/offset`, {
            params: { min, max },
        });
        return resp.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message:
                    'Serveur surchargé. Veuillez reessayer dans quelques minutes.',
                status: 429,
            };
        }

        logDev('getProjectsOffset error', err);
        return null;
    }
}
