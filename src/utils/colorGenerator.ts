export const getRandomHex = (): string => {
    const val = () => Math.floor(Math.random() * 150) + 50;
    const r = val();
    const g = val();
    const b = val();
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const getContrastRatio = (hex1: string, hex2: string): number => {
    const getLuminance = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = ((rgb >> 16) & 0xff) / 255;
        const g = ((rgb >> 8) & 0xff) / 255;
        const b = (rgb & 0xff) / 255;
        const val = [r, g, b].map((c) =>
            c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
        );
        return 0.2126 * val[0] + 0.7152 * val[1] + 0.0722 * val[2];
    };
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export const generateRandomColorWithContrast = (
    baseColor: string,
    minContrast = 4.5,
): string => {
    let color;
    let attempts = 0;
    do {
        color = getRandomHex();
        attempts++;
    } while (
        getContrastRatio(color, baseColor) < minContrast &&
        attempts < 100
    );
    return color;
};

export const generatePapucheTheme = (themeKey: string) => {
    const background = generateRandomColorWithContrast('#ffffff', 4.5);

    const valNuance = () => Math.floor(Math.random() * 16) + 240;
    const font =
        '#' +
        ((1 << 24) + (valNuance() << 16) + (valNuance() << 8) + valNuance())
            .toString(16)
            .slice(1);

    const primary = generateRandomColorWithContrast(background, 3);

    return {
        display_name: '🦄 Papuche',
        background: background,
        background_secondary: generateRandomColorWithContrast(font, 4.5),
        background_tertiary: generateRandomColorWithContrast(font, 4.5),
        primary: primary,
        secondary: generateRandomColorWithContrast(background, 3),
        accentuate: generateRandomColorWithContrast(background, 3),
        border: generateRandomColorWithContrast(background, 3),
        font: font,
        font_on_primary:
            getContrastRatio(primary, '#ffffff') >= 3 ? '#ffffff' : '#000000',
        font_subtle: font + 'cc',
        font_hint: font + '99',
    };
};
