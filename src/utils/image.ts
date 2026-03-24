import { AssetsBaseUrl } from '../config';
import { isApiDown } from '../api/apiHealth';

/**
 ** return proxy api URL for given image ID and options
 */
export const getProxyUrl = (imageId: string, options?: Record<string, any>): string => {
    if (!imageId) return '';
    if (typeof window !== 'undefined' && isApiDown()) return '';
    let optionsStr = '';
    let queryStr = '';

    if(options && options.size) {
        const { width, height } = options.size;
        optionsStr = `/size/${width}/${height}`;
    }

    if (options && options.folder) {
        queryStr = `?folder=${encodeURIComponent(options.folder)}`;
    }
    
    const url = `${AssetsBaseUrl}/images/proxy/${imageId}${optionsStr}${queryStr}`;
    return url;
}

/**
 ** return external URL
 */
export const getExternalUrl = (url: string): string => {
    return url;
}

/**
 ** resolve image URL based on input prefix
 */
export const resolveImageUrl = (input: string): string => {
    if (input.startsWith('proxy:')) {
        const rawContent = input.replace('proxy:', '');
        
        const [imageId, queryString] = rawContent.split('?');
        const params = new URLSearchParams(queryString);
        
        const w = params.get('w');
        const h = params.get('h');

        const options: any = {};
        if (w && h) {
            options.size = { width: w, height: h };
        }
        
        return getProxyUrl(imageId, options);
    }
    
    if (input.startsWith('url:')) {
        return input.replace('url:', '');
    }
    
    return input;
}