import React, { createContext, useContext, useState } from 'react';

const SettingContext = createContext();

export const useSettingContext = () => {
    return useContext(SettingContext);
};

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: "default",
        light: false
    });

    const changeTheme = (theme) => {
        setSettings({ ...settings, theme });
    };

    const changeLight = (light) => {
        setSettings({ ...settings, light });
    };

    return (
        <SettingContext.Provider value={{ settings, changeTheme, changeLight }}>
            {children}
        </SettingContext.Provider>
    );
};
