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

    // Temporarily disable toggling of high-contrast while fixing getter/call issues.
    // This makes `changeHighContrast` a no-op so the app behaves as if the
    // high-contrast mode is always off. Revert this change to re-enable.
    const changeHighContrast = useCallback((_highContrast: boolean): void => {
        // no-op (temporarily disabled)
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