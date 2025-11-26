import React, { createContext, useState, useContext } from 'react';
import { Loading } from '../components/Loading/Loading.component';

// Assure-toi que le chemin est bon (parfois c'est .js ou .jsx)
import { useScrollbar } from '../hooks/useScrollBar.hook';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(''); 
  
  const [duration, setDuration] = useState(4000); 

  useScrollbar(loading);

  const showLoading = (color = '', timeInMs = 4000) => {
    setColor(color);
    setDuration(timeInMs); 
    setLoading(true);
  };

  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, color, showLoading, hideLoading }}>
      {loading && <Loading $color={color} $duration={duration} />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);