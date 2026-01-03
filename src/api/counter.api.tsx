import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn(...args);
};

export async function getThemeRand(): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get<IApiResponse>(
            `${ApiBaseUrl}/counter/get/THEME_RAND`,
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

        logDev('getThemeRand error', err);
        return null;
    }
}

export async function incrementThemeRand(): Promise<IApiResponse | null> {
    try {
        const resp = await axios.post<IApiResponse>(
            `${ApiBaseUrl}/counter/increment/THEME_RAND`,
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

        logDev('incrementThemeRand error', err);
        return null;
    }
}
