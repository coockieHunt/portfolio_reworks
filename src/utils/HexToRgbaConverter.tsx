/**
 * Converts a hexadecimal color code to its corresponding RGBA representation.
 *
 * @param {string} hexCode - The hexadecimal color code (e.g., "#RRGGBB").
 * @param {number} alpha - The alpha value for the RGBA representation (between 0 and 1).
 * @returns {string|null} - The RGBA representation of the color, or null if the input is invalid.
 *
 * @example
 * const rgbaValue = HexToRgbaConverter("#3498db", 0.7);
 */

export const HexToRgbaConverter = (hexCode: string, alpha: number) : string | null => {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  
    if (!hexRegex.test(hexCode)) {return null; }
  
    const hexValue = hexCode.replace(/^#/, '');
    const bigint = parseInt(hexValue, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
  
    const rgbaString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  
    return rgbaString;
  };