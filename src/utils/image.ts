import { AssetsBaseUrl } from '../config';

/**
 ** return proxy Cloudinary URL
 */
export const getProxyUrl = (imageId: string): string => {
    return `${AssetsBaseUrl}/cloudinary/proxy/${imageId}`;
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