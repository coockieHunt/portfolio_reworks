/**
 * Converts a hexadecimal color code to its corresponding RGBA representation.
 * If the input is a CSS variable (starts with 'var('), returns it as is.
 * If not a valid hex, returns the input as is.
 *
 * @param {string} color - The color (hex code like "#RRGGBB" or CSS var like "var(--color)").
 * @param {number} alpha - The alpha value for the RGBA representation (between 0 and 1, ignored for vars).
 * @returns {string} - The RGBA representation or the original color.
 *
 * @example
 * const rgbaValue = HexToRgbaConverter("#3498db", 0.7); // "rgba(52, 152, 219, 0.7)"
 * const varValue = HexToRgbaConverter("var(--primary)", 0.7); // "var(--primary)"
 */

export const HexToRgbaConverter = (color: string, alpha: number): string => {
    if (color.startsWith('var(')) {
        return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
    }

    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

    if (!hexRegex.test(color)) {
        return color;
    }

    const hexValue = color.replace(/^#/, '');
    const bigint = parseInt(hexValue, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
