import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import { COLOR_SETTING } from '../config';
import {
    ISettingContext,
    ISettingProviderProps,
    ISettings,
} from './interface/Setting.interface';

type ThemeKey = keyof typeof COLOR_SETTING;
const SettingContext = createContext<ISettingContext | undefined>(undefined);

export const useSettingContext = (): ISettingContext => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error(
            'useSettingContext must be used within SettingProvider',
        );
    }
    return context;
};

const DEFAULT_SETTINGS: ISettings = {
    theme: 'default',
    light: 'dark',
    highContrast: false,
    reducedMotion: false,
    openDyslexic: false,
};

export const SettingProvider: React.FC<ISettingProviderProps> = ({
    children,
}) => {
    const [settings, setSettings] = useState<ISettings>(() => {
        if (typeof window !== 'undefined') {
            const savedSettings = localStorage.getItem('app-settings');
            if (savedSettings) {
                try {
                    return JSON.parse(savedSettings);
                } catch (e) {
                    console.error('Erreur lecture settings', e);
                }
            }
            //setyp motion reduc based on os 
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            return { ...DEFAULT_SETTINGS, reducedMotion: prefersReduced };
        }
        return DEFAULT_SETTINGS;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('app-settings', JSON.stringify(settings));

            const root = document.documentElement;

            root.classList.remove('light', 'dark');
            root.classList.add(settings.light);

            root.setAttribute('data-theme', settings.theme);

            //global class for config
            if (settings.highContrast) {
                root.classList.add('high-contrast');
            } else {
                root.classList.remove('high-contrast');
            }

            if (settings.reducedMotion) {
                root.classList.add('reduced-motion');
            } else {
                root.classList.remove('reduced-motion');
            }

            if (settings.openDyslexic) {
                root.classList.add('open-dyslexic');
            } else {
                root.classList.remove('open-dyslexic');
            }
        }
    }, [settings]);


    // change

    const changeTheme = useCallback((theme: ThemeKey): void => {
        setSettings((prev) => ({ ...prev, theme }));
    }, []);

    const changeLight = useCallback((light: string): void => {
        setSettings((prev) => ({ ...prev, light }));
    }, []);

    const changeHighContrast = useCallback((highContrast: boolean): void => {
        setSettings((prev) => ({ ...prev, highContrast }));
    }, []);

    const changeReducedMotion = useCallback((reducedMotion: boolean): void => {
        setSettings((prev) => ({ ...prev, reducedMotion }));
    }, []);

    const changeOpenDyslexic = useCallback((openDyslexic: boolean): void => {
        setSettings((prev) => ({ ...prev, openDyslexic }));
    }, []);

    const value = useMemo(
        () => ({
            settings,
            changeTheme,
            changeLight,
            changeHighContrast,
            changeReducedMotion,
            changeOpenDyslexic
        }),
        [settings, changeTheme, changeLight, changeHighContrast, changeReducedMotion, changeOpenDyslexic],
    );

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};
