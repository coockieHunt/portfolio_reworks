import { ApiBaseUrl } from '../config.tsx';

export async function getThemeRand() {
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
		console.warn('getThemeRand error', err);
		return null;
	}
}

export async function incrementThemeRand() {
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
		console.warn('incrementThemeRand error', err);
		return null;
	}
}
