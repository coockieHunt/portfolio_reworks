const API_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:3001/api';

export async function GetGuestbookEntries(password) {
    try {
        const resp = await fetch(`${API_URL}/guestbook/read`, {
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

export async function PostGuestbookEntry(password, name, message) {
    try {
        const resp = await fetch(`${API_URL}/guestbook/write`, {
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