import axios from 'axios';
import { ApiBaseUrl } from '../config';

import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.error(...args);
};

export async function sendEmail(formData: any): Promise<IApiResponse | null> {
    try {
        const response = await axios.post(
            `${ApiBaseUrl}/mail/sendEmail`,
            formData,
        );
        return response.data;
    } catch (err: any) {
        logDev('sendEmail error', err);

        if (axios.isAxiosError(err) && err.response) {
            if (err.response.status === 429) {
                return {
                    error: true,
                    message: 'Trop de tentatives. Réessayez plus tard.',
                };
            }
            return { error: true, message: 'Erreur serveur.' };
        }

        return { error: true, message: 'Erreur de connexion.' };
    }
}
