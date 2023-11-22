// ColorContext.js
import { createContext, useContext, useState } from 'react';
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState({
    primary: '#3498db',
    secondary: '#2ecc71',
  });

  const updateColor = (colorName, newColor) => {
    setColors({
      ...colors,
      [colorName]: newColor,
    });
  };

  return (
    <ColorContext.Provider value={{ colors, updateColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
    return useContext(ColorContext);
};
