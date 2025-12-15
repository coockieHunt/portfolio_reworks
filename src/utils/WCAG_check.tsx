import { IRgb, IGetContrastTextColor } from './interface/utils.interface';

/**
 * Converts a hex color string to an RGB object.
 *
 * Supports both shorthand (#abc) and full (#aabbcc) hex formats.
 *
 * @param {string} hex - The hex color string (e.g., "#fff" or "#ffffff").
 * @returns {{r: number, g: number, b: number}} An object with r, g, b values (0-255).
 */
export const hexToRgb = (hex: string): IRgb => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0}; 
};

/**
 * Determines whether black or white text has better contrast on a given hex background color.
 *
 * Uses the luminance formula to calculate brightness and returns the appropriate text color.
 *
 * @param {string} hexBackground - The hex color string for the background (e.g., "#fff" or "#ffffff").
 * @returns {string} The hex color string for the text ("#000000" for black or "#FFFFFF" for white).
 */
export const getContrastTextColor = ({ hexBackground }: IGetContrastTextColor): string => {
    const {r, g, b} = hexToRgb(hexBackground);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    const SEUIL = 0.50; 
    
    if (luminance > SEUIL) {
        return '#000000';
    } else {
        return '#FFFFFF'; 
    }
};