import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

interface ISettings {
    theme: string;
    light: string;
}

interface ISettingContext {
    settings: ISettings;
    changeTheme: (theme: string) => void;
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

interface ISettingProviderProps {
    children: ReactNode;
}

export const SettingProvider: React.FC<ISettingProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<ISettings>({
        theme: "default",
        light: "dark"
    });

    const changeTheme = useCallback((theme: string): void => {
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
