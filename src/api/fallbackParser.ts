import { FallbackCacheUrl } from '@/config';
import type { IApiResponse } from './interface/api.interface';
import { apiClient } from './AxiosClient';
import { setApiDown } from './apiHealth';

export type IWorkerCache = {
    blog?: {
        meta?: Record<string, unknown>;
        posts?: any[];
    };
    projects?: any[];
    tags?: any[];
};

let cachedPayload: IWorkerCache | null = null;
let cachePromise: Promise<IWorkerCache | null> | null = null;

const normalizeString = (value?: string) => (value ? value.toLowerCase().trim() : '');


const loadFallbackCache = async (): Promise<IWorkerCache | null> => {
    if (cachedPayload) return cachedPayload;
    if (cachePromise) return cachePromise;
    if (typeof window === 'undefined') return null;
    const request = apiClient
        .get<IWorkerCache>(FallbackCacheUrl, {
            baseURL: '',
            headers: {
                'Cache-Control': 'no-store',
            },
        })
        .then((resp) => {
            const payload = resp?.data ?? null;
            if (!payload) return null;
            cachedPayload = payload;
            setApiDown(true);
            return payload;
        })
        .catch((err) => {
            setApiDown(true);
            return null;
        })
        .finally(() => {
            cachePromise = null;
        });

    cachePromise = request;

    console.log(cachePromise);
    return request;
};

const buildResponse = (data: any): IApiResponse => ({
    success: true,
    message: 'fallback-cache',
    data,
});

export async function getFallbackBlogPosts(
    page: number = 1,
    limit: number = 100,
): Promise<IApiResponse | null> {
    const payload = await loadFallbackCache();
    const posts = payload?.blog?.posts;
    if (!Array.isArray(posts)) return null;

    const totalCount = posts.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const start = (safePage - 1) * limit;
    const sliced = posts.slice(start, start + limit);

    return buildResponse({
        meta: {
            total_count: totalCount,
            page: safePage,
            limit,
            total_pages: totalPages,
        },
        posts: sliced,
    });
}

export async function getFallbackBlogPostsOffset(
    min: number,
    max: number,
    titleContains?: string,
    tagsContains?: string,
): Promise<IApiResponse | null> {

    const payload = await loadFallbackCache();
    const posts = payload?.blog?.posts;
    if (!Array.isArray(posts)) return null;
    const normalizedTitle = normalizeString(titleContains);
    const normalizedTag = normalizeString(tagsContains);

    const filtered = posts.filter((entry) => {
        const postTitle = normalizeString(entry?.post?.title);
        if (normalizedTitle && !postTitle.includes(normalizedTitle)) {
            return false;
        }

        if (normalizedTag) {
            const tags = Array.isArray(entry?.tags) ? entry.tags : [];
            const hasTag = tags.some((tag: any) => {
                const slug = normalizeString(tag?.slug);
                const name = normalizeString(tag?.name);
                return slug === normalizedTag || name === normalizedTag || name.includes(normalizedTag);
            });
            if (!hasTag) return false;
        }

        return true;
    });

    const startIndex = Math.max(0, min - 1);
    const endIndex = Math.max(startIndex, max);
    const sliced = filtered.slice(startIndex, endIndex);

    return buildResponse({
        meta: {
            cursor_start: min,
            cursor_end: Math.min(max, filtered.length),
            requested_limit: Math.max(0, max - min + 1),
            total_count: filtered.length,
        },
        posts: sliced,
    });
}

export async function getFallbackBlogPostBySlug(
    slug: string,
): Promise<IApiResponse | null> {
    const payload = await loadFallbackCache();
    const posts = payload?.blog?.posts;
    if (!Array.isArray(posts)) return null;

    const normalizedSlug = normalizeString(slug);
    const match = posts.find(
        (entry) => normalizeString(entry?.post?.slug) === normalizedSlug,
    );

    if (!match) return null;
    return buildResponse(match);
}

export async function getFallbackTags(): Promise<IApiResponse | null> {
    const payload = await loadFallbackCache();
    const tags = payload?.tags;
    if (!Array.isArray(tags)) return null;
    return buildResponse(tags);
}

export async function getFallbackProjects(): Promise<IApiResponse | null> {
    const payload = await loadFallbackCache();
    const projects = payload?.projects;
    if (!Array.isArray(projects)) return null;

    return buildResponse({
        meta: {
            total_count: projects.length,
            total_pages: 1,
        },
        projects,
    });
}

export async function getFallbackProjectsOffset(
    min: number = 1,
    max: number = 6,
): Promise<IApiResponse | null> {
    const payload = await loadFallbackCache();
    const projects = payload?.projects;
    if (!Array.isArray(projects)) return null;

    const startIndex = Math.max(0, min - 1);
    const endIndex = Math.max(startIndex, max);
    const sliced = projects.slice(startIndex, endIndex);

    return buildResponse({
        meta: {
            total_count: projects.length,
            total_pages: Math.max(1, Math.ceil(projects.length / Math.max(1, max - min + 1))),
        },
        projects: sliced,
    });
}
