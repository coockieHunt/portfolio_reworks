/**
 * Converts a hexadecimal color to a CSS filter string for visual effects.
 *
 * @param {string} Hex - The hexadecimal color to convert (in the format "#RRGGBB").
 * @returns {string} A CSS filter string ready to be used in an HTML element's style.
 *
 * @example
 */

export const HexToFilters = (Hex) => {
    const red = parseInt(Hex.slice(1, 3), 16);
    const green = parseInt(Hex.slice(3, 5), 16);
    const blue = parseInt(Hex.slice(5, 7), 16);
  
    const invertValue = 100 - (red + green + blue) / 7.65;
    const sepiaValue = 100 - (red * 0.393 + green * 0.769 + blue * 0.189);
    const saturateValue = red + green + blue;
    const hueRotateValue = 60 * (red - green) / saturateValue + 180;
    const brightnessValue = saturateValue / 765;
  
    return `invert(${invertValue}%) sepia(${sepiaValue}%) saturate(${saturateValue}%) hue-rotate(${hueRotateValue}deg) brightness(${brightnessValue * 100}%);`;
}