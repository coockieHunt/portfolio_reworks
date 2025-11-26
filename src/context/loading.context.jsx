import React, { createContext, useContext, useState } from 'react';
import { Loading } from "../components/Loading/Loading.component"; 
import { useScrollbar } from '../hooks/useScrollBar.hook';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    
    const [config, setConfig] = useState({ color: 'white', duration: 2, text: '' });
    const [animKey, setAnimKey] = useState(0);

    useScrollbar(isActive); 

    const showLoading = (color, durationMs, text) => {
        const durationSec = durationMs / 1000;
        setConfig({ color: color || 'white', duration: durationSec, text: text || '' });
        setAnimKey(prev => prev + 1);
        setIsActive(true);
    };

    const hideLoading = () => {
        setIsActive(false);
    };

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {children}
            {isActive && (
                <Loading 
                    key={animKey}
                    $color={config.color}
                    $duration={config.duration * 1000} 
                    text={config.text}
                />
            )}
        </LoadingContext.Provider>
    );
};