import { IApiResponse } from '../interface/api.interface';

import { apiClient } from '../AxiosClient';

//fallback
import { withFallback } from '../requestWrapper';
import {
    getFallbackProjects,
    getFallbackProjectsOffset,
} from '../fallbackParser';

export async function getProjects(): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get('/projects/');
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackProjects(),
    );
}

export async function getProjectsOffset(
    min: number = 1,
    max: number = 6,
): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get('/projects/offset', {
                    params: { min, max },
                });
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackProjectsOffset(min, max),
    );
}
