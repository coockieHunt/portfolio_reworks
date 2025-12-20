// parselist from redis
export const parseList = (val: string | undefined, fallback: string[] = []): string[] => {
	if (!val || typeof val !== 'string') return fallback;
	return val
		.split(',')
		.map(s => s.trim())
		.filter(Boolean);
};