export const normalizeUrl = (url: string | undefined): string => {
    if (!url) return '';
    let clean = url.split('?')[0];
    if (clean.endsWith('/') && clean.length > 1) {clean = clean.slice(0, -1);}
    return clean.toLowerCase();
}