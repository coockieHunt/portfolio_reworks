import {useSettingContext} from "./context/Setting.context"

//FUNCTION
export const getColorSettings = () => {
    const { settings } = useSettingContext();
    return COLOR_SETTING[settings.theme] || COLOR_SETTING.default;
};

export const GetLightSetting = () => {
    const { settings } = useSettingContext();
    return LIGHT_SETTING[settings.light] || LIGHT_SETTING.dark;
};

//CONSTANTS
export const COLOR_SETTING = {
    default: {
        background: '#303134',
        background_secondary: '#221f30',
        background_tertiary: '#1a1a1a',

        primary: "#5943e4",
        secondary: "#32256c",
        accentuate: '#404ad6',

        border: "rgba(0, 0, 0, 0.16)"
    },

    red: {
        background: '#303134',
        background_secondary: '#2c1510',
        background_tertiary: '#4a1712',

        primary: "#e74c3c",
        secondary: "#a0392c",
        accentuate: '#ff7a6b',

        border: "#4a4b52"
    },

    green: {
        background: '#303134',
        background_secondary: '#172419',
        background_tertiary: '#1f4224',

        primary: "#2ecc71",
        secondary: "#1d6333",
        accentuate: '#58d68e',

        border: "#4a4b52"
    },

    yellow: {
        background: '#303134',
        background_secondary: '#2c2415',
        background_tertiary: '#4a3d17',

        primary: "#f39c12",
        secondary: "#b9770e",
        accentuate: '#ffbb59',

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

// Alias exports for backward compatibility
export const COLOR = COLOR_SETTING;
export const setting = LIGHT_SETTING;