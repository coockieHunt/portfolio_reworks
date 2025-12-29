import axios from 'axios';
import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.warn(...args); };

export async function GetGuestbookEntries(password : string): Promise<IApiResponse | null> {
    try {
        const response = await axios.post(`${ApiBaseUrl}/guestbook/read`, {
            password,
            page: 1,
            limit: 100
        });
        
        logDev('GetGuestbookEntries data', response.data);
        return response.data;
    } catch (err: any) {
        logDev('GetGuestbookEntries error', err);
        if (axios.isAxiosError(err) && err.response) {
             if (err.response.status === 429) {
                return {
                    error: true,
                    message: 'Too many requests, please try again later.',
                    status: 429
                };
            }
            if (err.response.status === 400) {
                 return {
                    error: true,
                    message: err.response.data.message || 'Bad Request',
                    status: 400
                };
            }
        }
        return null;
    }
}

export async function PostGuestbookEntry(password: string, name: string, message: string): Promise<IApiResponse | null> {
     try {
        const response = await axios.post(`${ApiBaseUrl}/guestbook/write`, {
            password,
            name,
            message
        });
        return response.data;
    } catch (err: any) {
        logDev('PostGuestbookEntry error', err);
         if (axios.isAxiosError(err) && err.response) {
             if (err.response.status === 429) {
                return {
                    error: true,
                    message: 'Too many requests, please try again later.',
                    status: 429
                };
            }
            if (err.response.status === 400) {
                 return {
                    error: true,
                    message: err.response.data.message || 'Bad Request',
                    status: 400
                };
            }
        }
        return null;
    }
}