import { ApiBaseUrl } from '../config';
import { IApiResponse } from './interface/api.interface';

const logDev = (...args: unknown[]) => { if (import.meta.env.DEV) console.warn(...args); };

export async function get[FTName]() : Promise<IApiResponse | null> {
	try {
		const resp = await fetch(`${ApiBaseUrl}/[FTName]/get`);
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
		logDev('get[FTName] error', err);
		return null;
	}
}

export async function update[FTName]() : Promise<IApiResponse | null> {
	try {
		const resp = await fetch(`${ApiBaseUrl}/[FTName]/update`, { method: 'POST' });
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
		logDev('update[FTName] error', err);
		return null;
	}
}