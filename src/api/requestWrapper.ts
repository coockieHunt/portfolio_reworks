import { IApiResponse } from './interface/api.interface';
import { isApiDown, setApiDown } from './apiHealth';

export async function withFallback(
    apiCall: () => Promise<{ data: IApiResponse }>,
    fallbackCall: () => Promise<IApiResponse | null>
): Promise<IApiResponse | null> {
    if (typeof window !== 'undefined' && !navigator.onLine) {
        return await fallbackCall();
    }

    if (typeof window !== 'undefined' && isApiDown()) {
        return await fallbackCall();
    }

    try {
        const response = await apiCall();
        setApiDown(false);
        return response.data;
    } catch (err) {
        setApiDown(true);
        return await fallbackCall();
    }
}