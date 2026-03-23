import React, { createContext, useContext, useEffect, useState } from 'react';

export const API_HEALTH_EVENT = 'API_HEALTH_CHANGE';

type ApiStatusContextType = {
    isApiDown: boolean;
};

const ApiStatusContext = createContext<ApiStatusContextType>({ isApiDown: false });

export const ApiStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isApiDown, setIsApiDown] = useState(false);

    useEffect(() => {
        const handleHealth = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setIsApiDown(!detail.ok);
        };

        window.addEventListener(API_HEALTH_EVENT, handleHealth);
        return () => window.removeEventListener(API_HEALTH_EVENT, handleHealth);
    }, []);

    return (
        <ApiStatusContext.Provider value={{ isApiDown }}>
            {children}
        </ApiStatusContext.Provider>
    );
};

export const useApiStatus = () => useContext(ApiStatusContext);