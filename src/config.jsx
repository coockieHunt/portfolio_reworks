import {useSettingContext} from "./context/Setting.context"

//FUNCTION
export const useColorSettings = () => {
    const { settings } = useSettingContext();
    return COLOR_SETTING[settings.theme] || COLOR_SETTING.default;
};

export const getColorSettings = (theme) => {
    if(!theme) return COLOR_SETTING.default;
    const themeName = theme.theme || theme;
    return COLOR_SETTING[themeName] || COLOR_SETTING.default;
};

export const useLightSettings = () => {
    const { settings } = useSettingContext();
    return LIGHT_SETTING[settings.light] || LIGHT_SETTING.dark;
};

export const GetLightSetting = (theme) => {
    if(!theme) return LIGHT_SETTING.dark;
    const lightName = theme.light || theme;
    return LIGHT_SETTING[lightName] || LIGHT_SETTING.dark;
};

//CONSTANTS
export const COLOR_SETTING = {
    default: {
        display_name: "Nuit",
        background: '#303134',
        background_secondary: '#221f30',
        background_tertiary: '#1a1a1a',

        primary: "#5943e4",
        secondary: "#32256c",
        accentuate: '#404ad6',

        border: "rgba(0, 0, 0, 0.16)"
    },

    red: {
        display_name: "Magma",
        background: '#303134',
        background_secondary: '#2c1510',
        background_tertiary: '#4a1712',

        primary: "#e74c3c",
        secondary: "#a0392c",
        accentuate: '#ff7a6b',

        border: "#4a4b52"
    },

    green: {
        display_name: "Matrix",
        background: '#303134',
        background_secondary: '#172419',
        background_tertiary: '#1f4224',

        primary: "#2ecc71",
        secondary: "#1d6333",
        accentuate: '#58d68e',

        border: "#4a4b52"
    },

    yellow: {
        display_name: "Électrique",
        background: '#303134',
        background_secondary: '#2c2415',
        background_tertiary: '#4a3d17',

        primary: "#f39c12",
        secondary: "#b9770e",
        accentuate: '#ffbb59',

        border: "#4a4b52"
    },

    cyan: {
        display_name: "Cyber Wave",
        background: '#303134',
        background_secondary: '#0d2b2e',
        background_tertiary: '#134147',
        
        primary: "#00d9ff",
        secondary: "#008ba3",
        accentuate: '#4dffff',
        
        border: "#4a4b52"
    },

    pink: {
        display_name: "Dreams",
        background: '#303134',
        background_secondary: '#2a1525',
        background_tertiary: '#4a1f3d',
        
        primary: "#e91e63",
        secondary: "#ad1457",
        accentuate: '#ff6090',
        
        border: "#4a4b52"
    },

    ice: {
        display_name: "Frost ",
        background: '#303134',
        background_secondary: '#0f1c2e',
        background_tertiary: '#1a2f4a',
        
        primary: "#3498db",
        secondary: "#2471a3",
        accentuate: '#5dade2',
        
        border: "#4a4b52"
    }
};

export const LIGHT_SETTING = {
    light:{
        background: 'white',
        background_secondary: '#d7d7db',
        background_tertiary: '#a4a4a7',

        background_accentuated: '#d1cfcb',

        background_alpha : .1,

        font: 'black',
    },

    dark:{
        background: '#121212',
        background_secondary: '#292929',
        background_tertiary: '#303134',

        background_accentuated: '#261D07',

        background_alpha : 1,


        font: 'white',
    },
};



export const SCREEN_SIZE = {
    mobile: '850px',
    tablet: '1150px'
}

export const ApiBaseUrl = "https://api.jonathan-portfolio.com";
export const MailDefault =  { firstName: '', lastName: '', email: '', message: '' };

// Alias exports for backward compatibility
export const COLOR = COLOR_SETTING;
export const setting = LIGHT_SETTING;