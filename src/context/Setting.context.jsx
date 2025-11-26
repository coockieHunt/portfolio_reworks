import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const SettingContext = createContext();

export const useSettingContext = () => {
    return useContext(SettingContext);
};

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: "default",
        light: "dark"
    });

    const changeTheme = useCallback((theme) => {
        setSettings(prev => ({ ...prev, theme }));
    }, []);

    const changeLight = useCallback((light) => {
        setSettings(prev => ({ ...prev, light }));
    }, []);

    const value = useMemo(() => ({
        settings,
        changeTheme,
        changeLight
    }), [settings, changeTheme, changeLight]);

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};
