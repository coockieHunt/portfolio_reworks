import { ReactNode } from "react";
import { COLOR_SETTING } from '../../config'; 

type ThemeKey = keyof typeof COLOR_SETTING;

export interface ISettings {
    theme: ThemeKey; 
    light: string;   
}

export interface ISettingContext {
    settings: ISettings;
    changeTheme: (theme: ThemeKey) => void;
    changeLight: (light: string) => void;
}

export interface ISettingProviderProps {
        children: ReactNode;
    
}


