import {useSettingContext} from "./context/Setting.context"
import { AiFillLayout, AiOutlineRise, AiOutlineAim } from "react-icons/ai";


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

export const productList = [
    { 
        id: 1, 
        title: "Gestion de contenu", 
        icon: <AiFillLayout/>, 
        subTitle: 'Wordpress, e-comerce, Vitrine',
        description: "Flexibilité est le mot d'ordre. Que vous soyez un entrepreneur en herbe ou une grande entreprise, un CMS s'adapte à vos besoins. Mettez à jour votre site en temps réel sans attendre un développeur. Collaborez facilement avec votre équipe grâce à une interface intuitive. La sécurité est notre priorité, assurant la protection de votre contenu contre les menaces potentielles.",
        price: 0,
        time: 0
    },
    { 
        id: 2, 
        title: "Application web", 
        icon: <AiOutlineRise/>,
        subTitle: 'Aplication metier',
        description: "Que vous soyez un particulier cherchant à marquer sa présence en ligne ou une entreprise en quête d'innovation, je m'adapte à vos besoins spécifiques. La mise en place d'une interface intuitive permet une gestion fluide du contenu, et les mises à jour se font sans difficulté.",
        price: 0,
        time: 0
    },
    { 
        id: 3, 
        title: "Consulting", 
        icon: <AiOutlineAim/>,
        subTitle: 'Audite Web',
        description: "Un audit approfondi de votre site web, évaluant chaque aspect de sa performance. De l'expérience utilisateur à la structure technique, Identifions les opportunités d'optimisation pour renforcer votre impact en ligne.",
        price: 0,
        time: 0
    },
];

export const word_hero = [
    'idée',
    'projet',
    'concept',
    'vision',
    'rêve',
    'univers',
    'œuvre',
    'entreprise',
    'marque',
    'inspiration',
    'pensée',
    'passion',
    'équilibre',
    'quête',
    'silence',
    'monde',
];

// Alias exports for backward compatibility
export const COLOR = COLOR_SETTING;
export const setting = LIGHT_SETTING;