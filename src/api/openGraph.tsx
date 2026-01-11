import axios from 'axios';
import { AssetsBaseUrl } from '../config';

import { IApiResponse } from './interface/api.interface';


const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.error(...args);
};

export function getOpenGraphUrl(slug: string, title: string, lastEdit: string) {
    const params = new URLSearchParams({
        slug,
        title,
        lastEdit
    });

    const url_build = `${AssetsBaseUrl}/opengraph/get?${params.toString()}`;

    console.log('Generated Open Graph URL:', url_build);
    return url_build;
}
