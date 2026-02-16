import { IApiResponse } from '../interface/api.interface';
import { apiClient } from '../AxiosClient';

export async function GetGuestbookEntries(
    password: string,
): Promise<IApiResponse | null> {
    try {
        const response = await apiClient.get('/guestbook', {
            params: {
                password,
                page: 1,
                limit: 100,
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function PostGuestbookEntry(
    password: string,
    name: string,
    message: string,
): Promise<IApiResponse | null> {
    try {
        const response = await apiClient.post('/guestbook/', {
            password,
            name,
            message,
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}