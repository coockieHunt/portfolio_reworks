import { ApiBaseUrl } from '../config.js';

import { IApiResponse } from './interface/api.interface.js';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.error(...args); };

export async function sendEmail(formData : any): Promise<IApiResponse | null> {
	try {
		const resp = await fetch(`${ApiBaseUrl}/mail/sendEmail`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});

		if (!resp.ok) {
			if (resp.status === 429) {
				return { error: true, message: 'Trop de tentatives. Réessayez plus tard.' };
			}
			return { error: true, message: 'Erreur serveur.' };
		}

		return await resp.json();
	} catch (err) {
		logDev('sendEmail error', err);
		return { error: true, message: 'Erreur de connexion.' };
	}
}