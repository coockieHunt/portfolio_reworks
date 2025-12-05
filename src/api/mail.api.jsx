import { ApiBaseUrl } from '../config.tsx';

export async function sendEmail(formData) {
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
		console.error('sendEmail error', err);
		return { error: true, message: 'Erreur de connexion.' };
	}
}