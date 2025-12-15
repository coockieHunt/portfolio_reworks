import { ApiBaseUrl } from '../config';

import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.warn(...args); };

export async function getThemeRand() : Promise<IApiResponse | null> {
	try {
		const resp = await fetch(`${ApiBaseUrl}/counter/get/THEME_RAND`);
		if (!resp.ok) {
			if (resp.status === 429) {
				return {
					error: true,
					message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
					status: 429
				};
			}
			return null;
		}
		const data = await resp.json();
		return data;
	} catch (err) {
		logDev('getThemeRand error', err);
		return null;
	}
}

export async function incrementThemeRand() : Promise<IApiResponse | null> {
	try {
		const resp = await fetch(`${ApiBaseUrl}/counter/increment/THEME_RAND`, { method: 'POST' });
		if (!resp.ok) {
			if (resp.status === 429) {
				return {
					error: true,
					message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
					status: 429
				};
			}
			return null;
		}
		const data = await resp.json();
		return data;
	} catch (err) {
		logDev('incrementThemeRand error', err);
		return null;
	}
}
