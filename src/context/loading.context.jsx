import React, { createContext, useState, useContext } from 'react';
import { Loading } from '../components/Loading/Loading.component';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(''); 

  const showLoading = (color = '') => {
    setColor(color); 
    setLoading(true);
  };

  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, color, showLoading, hideLoading }}>
      {loading && <Loading $loading={loading} $color={color} />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);