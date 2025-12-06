import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { COLOR_SETTING } from '../config'; 

//get key of COLOR_SETTING
type ThemeKey = keyof typeof COLOR_SETTING;

// define settings interface
interface ISettings {
    theme: ThemeKey; 
    light: string;   
}

// define context interface
interface ISettingContext {
    settings: ISettings;
    changeTheme: (theme: ThemeKey) => void;
    changeLight: (light: string) => void;
}

const SettingContext = createContext<ISettingContext | undefined>(undefined);

export const useSettingContext = (): ISettingContext => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error('useSettingContext must be used within SettingProvider');
    }
    return context;
};

// define provider props interface
interface ISettingProviderProps {
    children: ReactNode;
}

export const SettingProvider: React.FC<ISettingProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<ISettings>({
        theme: "default", 
        light: "dark"
    });

    const changeTheme = useCallback((theme: ThemeKey): void => {
        setSettings(prev => ({ ...prev, theme }));
    }, []);

    const changeLight = useCallback((light: string): void => {
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