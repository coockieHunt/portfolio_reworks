import { ApiBaseUrl } from '../config.jsx';

const API_URL = import.meta?.env?.VITE_API_URL || ApiBaseUrl || 'http://localhost:3001';

export async function sendEmail(content) {
	try {
		const resp = await fetch(`${API_URL}/api/sendEmail`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(content),
		});

		if (!resp.ok) {
			if (resp.status === 429) {
				return {
					error: true,
					message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
					status: 429
				};
			}
			const txt = await resp.text().catch(() => null);
			console.warn('sendEmail non-ok response', resp.status, txt);
			return null;
		}

		const data = await resp.json().catch(() => null);
		return data;
	} catch (err) {
		console.error('sendEmail error', err);
		return null;
	}
}
