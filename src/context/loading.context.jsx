import React, { createContext, useState, useContext } from 'react';
import { Loading } from '../components/Loading/Loading.component';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(''); // Ajout de la couleur

  const showLoading = (color = '') => {
    setColor(color); // Mise à jour de la couleur si elle est fournie
    setLoading(true);
  };

  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, color, showLoading, hideLoading }}>
      {loading && <Loading $loading={loading} $color={color} />} {/* Passer la couleur au composant de chargement */}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);