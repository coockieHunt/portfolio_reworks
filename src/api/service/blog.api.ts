import { IApiResponse } from '../interface/api.interface';
import { apiClient } from '../AxiosClient';

//fallback
import { withFallback } from '../requestWrapper';
import {
    getFallbackBlogPostBySlug,
    getFallbackBlogPosts,
    getFallbackBlogPostsOffset,
    getFallbackTags,
} from '../fallbackParser';

export async function getBlogPosts(
    page: number = 1,
    limit: number = 100,
): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get('/blog/all', {
                    params: {
                        page,
                        limit,
                    },
                });
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackBlogPosts(page, limit),
    );
}

export async function getBlogPostsOffset(
    min: number,
    max: number,
    titleContains?: string,
    tagsContains?: string,
): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get('/blog/offset', {
                    params: {
                        min,
                        max,
                        titleContains,
                        tagsContains,
                    },
                });
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackBlogPostsOffset(min, max, titleContains, tagsContains),
    );
}

export async function getBlogPostBySlug(
    slug: string,
): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get<IApiResponse>(`/blog/${slug}`);
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackBlogPostBySlug(slug),
    );
}

export async function getTagList(): Promise<IApiResponse | null> {
    return withFallback(
        async () => {
            try {
                return await apiClient.get<IApiResponse>('/tags/');
            } catch (err) {
                throw err;
            }
        },
        () => getFallbackTags(),
    );
}