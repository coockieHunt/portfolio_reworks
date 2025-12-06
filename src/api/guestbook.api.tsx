import { ApiBaseUrl } from '../config.js';

interface IApiResponse {
	error?: boolean;
	message?: string;
	status?: number;
	[key: string]: any;
}

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

        console.log('GetGuestbookEntries data:', data);
        return data;
    } catch (err) {
        console.warn('GetGuestbookEntries error', err);
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
        console.warn('PostGuestbookEntry error', err);
        return null;
    }
}