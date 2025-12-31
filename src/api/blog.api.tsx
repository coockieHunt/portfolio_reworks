import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.warn(...args); };


export async function getBlogPosts(): Promise<IApiResponse | null> {
    try {
        const resp = await axios.post(`${ApiBaseUrl}/blog/`, {
            page: 1,
            limit: 100
        });
        
        return resp.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
                status: 429
            };
        }
        
        logDev('getBlogPosts error', err);
        return null;
    }
}

export async function getBlogPostBySlug(slug: string): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get<IApiResponse>(`${ApiBaseUrl}/blog/post/${slug}`);
        return resp.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 429) {
            return {
                error: true,
                message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
                status: 429
            };
        }

        logDev('getBlogPostBySlug error', err);
        return null;
    }
}