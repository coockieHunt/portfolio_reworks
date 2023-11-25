// theme.context.jsx

import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useColorContext = () => {
    return useContext(ThemeContext);
};

export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState({
        primary: '#cce443',
        secondary: '#e4cc43',
        background: '#ff0000',
        secondary_background: '#00ff55',
    });

    const updateColors = (newColors) => {
        setColors(newColors);
    };

    const contextValue = {
        colors,
        updateColors,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
