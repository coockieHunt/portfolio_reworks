export const hexToRgb = (hex) => {
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

export const getContrastTextColor = (hexBackground) => {
    const {r, g, b} = hexToRgb(hexBackground);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    const SEUIL = 0.50; 
    
    if (luminance > SEUIL) {
        return '#000000';
    } else {
        return '#FFFFFF'; 
    }
};