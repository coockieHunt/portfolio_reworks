import { AssetsBaseUrl } from '../config';

/**
 ** return proxy Cloudinary URL
 */
export const getProxyUrl = (imageId: string, options?: Record<string, any>): string => {
    let optionsStr = '';

    if(options && options.size) {
        const { width, height } = options.size;
        optionsStr = `/size/${width}/${height}`;
    }
    
    const url = `${AssetsBaseUrl}/images/proxy/${imageId}${optionsStr}`;
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
        const imageId = input.replace('proxy:', '');
        return getProxyUrl(imageId);
    }
    
    if (input.startsWith('url:')) {
        const url = input.replace('url:', '');
        return getExternalUrl(url);
    }
    
    return input;
}