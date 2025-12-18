import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { COLOR_SETTING } from '../config'; 

import { ISettingContext, ISettingProviderProps, ISettings } from './interface/Setting.interface';

type ThemeKey = keyof typeof COLOR_SETTING;
const SettingContext = createContext<ISettingContext | undefined>(undefined);

export const useSettingContext = (): ISettingContext => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error('useSettingContext must be used within SettingProvider');
    }
    return context;
};

export const SettingProvider: React.FC<ISettingProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<ISettings>({
        theme: "default",
        light: "dark",
        highContrast: false
    });

    const changeTheme = useCallback((theme: ThemeKey): void => {
        setSettings(prev => ({ ...prev, theme }));
    }, []);

    const changeLight = useCallback((light: string): void => {
        setSettings(prev => ({ ...prev, light }));
    }, []);

    const changeHighContrast = useCallback((highContrast: boolean): void => {
        setSettings(prev => ({ ...prev, highContrast }));
    }, []);

    const value = useMemo(() => ({
        settings,
        changeTheme,
        changeLight,
        changeHighContrast
    }), [settings, changeTheme, changeLight, changeHighContrast]);

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};