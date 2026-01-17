import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn(...args);
};

export async function getBlogPosts(
    page: number = 1,
    limit: number = 100,
): Promise<IApiResponse | null> {
    try {
        const resp = await axios.post(`${ApiBaseUrl}/blog/`, {
            page,
            limit,
        });

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

        logDev('getBlogPosts error', err);
        return null;
    }
}

export async function getBlogPostsOffset(
    min: number,
    max: number,
    titleContains?: string,
    tagsContains?: string,
): Promise<IApiResponse | null> {
    try {
        const resp = await axios.post(`${ApiBaseUrl}/blog/offset`, {
            min,
            max,
            titleContains,
            tagsContains,
        });
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

        logDev('getBlogPostsOffset error', err);
        return null;
    }
}

export async function getBlogPostBySlug(
    slug: string,
): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get<IApiResponse>(
            `${ApiBaseUrl}/blog/${slug}`,
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

        logDev('getBlogPostBySlug error', err);
        return null;
    }
}

export async function getTagList(): Promise<IApiResponse | null> {
    try {
        const resp = await axios.get<IApiResponse>(`${ApiBaseUrl}/tags/`);
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

        logDev('getTagList error', err);
        return null;
    }
}
