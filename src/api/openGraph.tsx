import axios from 'axios';
import { AssetsBaseUrl } from '../config';

import { IApiResponse } from './interface/api.interface';


const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.error(...args);
};

export function getOpenGraphUrl(slug: string, title: string, author: string, lastEdit: string): string {
    const params = new URLSearchParams({
        slug,
        title,
        author,
        date: lastEdit,
    });


    const url_build = `${AssetsBaseUrl}/opengraph/get?${params.toString()}`;

    return url_build;
}
