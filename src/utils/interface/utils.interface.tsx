export interface IApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface IRgb {
    r: number;
    g: number;
    b: number;
}

export interface IGetContrastTextColor {
    rgbColor: IRgb;
    hexBackground: string;
}

export interface iColorSettings {
    primary: string;
    secondary: string;
    accent: string;
}

export interface iLightSettings {
    light: iColorSettings;
    dark: iColorSettings;
}

export interface iStackItem {
    name: string;
    icon?: string;
    [key: string]: any;
}
