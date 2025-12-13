import { ApiBaseUrl } from '../config.js';

import { IApiResponse } from './interface/api.interface.js';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.warn(...args); };

export async function GetGuestbookEntries(password : string): Promise<IApiResponse | null> {
    try {
        const resp = await fetch(`${ApiBaseUrl}/guestbook/read`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        
        if(resp.status === 429) {
            return {
                error: true,
                message: 'Too many requests, please try again later.',
                status: 429
            };
        }

        if (resp.status === 400) {
            const errorData = await resp.json();
            return {
                error: true,
                message: errorData.message || 'Bad Request',
                status: 400
            };
        }

        if (!resp.ok) {return null;}
        const data = await resp.json();

		logDev('GetGuestbookEntries data', data);

        return data;
    } catch (err) {
        logDev('GetGuestbookEntries error', err);
        return null;
    }
}

export async function PostGuestbookEntry(password: string, name: string, message: string): Promise<IApiResponse | null> {
    try {
        const resp = await fetch(`${ApiBaseUrl}/guestbook/write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password, name, message}) 
        });

        if(resp.status === 429) {
            return {
                error: true,
                message: 'Too many requests, please try again later.',
                status: 429
            };
        }
        if (resp.status === 400) {
            const errorData = await resp.json();
            return {
                error: true,
                message: errorData.message || 'Bad Request',
                status: 400
            };
        }

        if (!resp.ok) {return null;}
        const data = await resp.json();
        return data;
    } catch (err) {
        logDev('PostGuestbookEntry error', err);
        return null;
    }
}