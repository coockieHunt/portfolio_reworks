import React, { createContext, useContext, useState } from 'react';

const SettingContext = createContext();

export const useSettingContext = () => {
    return useContext(SettingContext);
};

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: "default"
    });

    const changeTheme = (theme) => {
        setSettings({ ...settings, theme });
    };

    return (
        <SettingContext.Provider value={{ settings, changeTheme }}>
            {children}
        </SettingContext.Provider>
    );
};
