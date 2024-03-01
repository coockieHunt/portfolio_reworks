import {useSettingContext} from "./context/Setting.context"

export const COLOR_SETTING = {
    default:{
        background: '#121212',
        background_tertiary: '#303134',

        background_accentuated: '#221f30',

        primary: "#5943e4",
        secondary: "#32256c",
        accentuate: '#404ad6',

        border: "rgba(0, 0, 0, 0.16)"
    },

    red:{
        background: '#121212',
        background_tertiary: 'green',

        background_accentuated: '#1a0806',

        primary: "#bf2e1f",
        secondary: "#780e04",
        accentuate: '#780e04',

        border: "rgba(0, 0, 0, 0.16)"
    },

    green:{
        background: '#121212',
        background_tertiary: '#303134',

        background_accentuated: '#040f06',

        primary: "#166e29",
        secondary: "#0E461A", 
        accentuate: '#404ad6',
        
        border: "#737272"
    },

    yellow:{
        background: '#121212',
        background_tertiary: '#303134',

        background_accentuated: '#261D07',

        primary: "#996d05",
        secondary: "#745817", 
        accentuate: '#404ad6',
        
        border: "#737272"
    }
};

export const LIGHT_SETTING = {
    light:{
        background: 'white',
        background_secondary: '#99999c',
        background_tertiary: '#303134',
        font: 'black',
    },

    dark:{
        background: '#121212',
        background_accentuated: '#202020',
        background_tertiary: '#303134',
        font: 'white',
    },
};

export const getColorSettings = () => {
    const { settings } = useSettingContext();
    return COLOR_SETTING[settings.theme] || COLOR_SETTING.default;
};

export const GetLightSetting = () => {
    const { settings } = useSettingContext();
    return LIGHT_SETTING[settings.light] || LIGHT_SETTING.dark;
}

export const SCREEN_SIZE = {
    mobile: '850px',
}

export const CONTACT_EMAIL = 'pro.jonathan.gleyze@gmail.com'

export const URL = {
    DeviantArt: 'https://www.deviantart.com/coockiehunt',
    github: 'https://github.com/coockieHunt',
    linkedin: 'https://www.linkedin.com/in/jonathan-gleyze-173ab7239/',
    github_hook: 'https://github.com/coockieHunt/custom_hook',
    ghithudb_portfolio: 'https://github.com/coockieHunt/portfolio',
    ghithudb_portfolio_rework: 'https://github.com/coockieHunt/portfolio_reworks',
    ghithudb_portfolio_rework_api: 'https://github.com/coockieHunt/api-mail/tree/master',
    ghithudb_game: 'https://github.com/coockieHunt/ck_rp',
}