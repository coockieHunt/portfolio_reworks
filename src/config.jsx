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
    default:{
        background: '#303134',
        background_secondary: '#221f30',

        primary: "#5943e4",
        secondary: "#32256c",
        accentuate: '#404ad6',

        border: "rgba(0, 0, 0, 0.16)"
    },

    red:{
        background: '#303134',
        background_secondary: '#1a0806',


        primary: "#bf2e1f",
        secondary: "#780e04",
        accentuate: '#780e04',

        border: "rgba(0, 0, 0, 0.16)"
    },

    green:{
        background: '#303134',
        background_secondary: '#040f06',


        primary: "#166e29",
        secondary: "#0E461A", 
        accentuate: '#115720',
        
        border: "#737272"
    },

    yellow:{
        background: '#303134',
        background_secondary: '#261D07',


        primary: "#996d05",
        secondary: "#745817", 
        accentuate: '#6e4e03',
        
        border: "#737272"
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
        content: "Flexibilité est le mot d'ordre. Que vous soyez un entrepreneur en herbe ou une grande entreprise, un CMS s'adapte à vos besoins. Mettez à jour votre site en temps réel sans attendre un développeur. Collaborez facilement avec votre équipe grâce à une interface intuitive. La sécurité est notre priorité, assurant la protection de votre contenu contre les menaces potentielles.",
        price: 0,
        time: 0
    },
    { 
        id: 2, 
        title: "Application web", 
        icon: <AiOutlineRise/>,
        subTitle: 'Aplication metier',
        content: "Que vous soyez un particulier cherchant à marquer sa présence en ligne ou une entreprise en quête d'innovation, je m'adapte à vos besoins spécifiques. La mise en place d'une interface intuitive permet une gestion fluide du contenu, et les mises à jour se font sans difficulté.",
        price: 0,
        time: 0
    },
    { 
        id: 3, 
        title: "Consulting", 
        icon: <AiOutlineAim/>,
        subTitle: 'Audite Web',
        content: "Un audit approfondi de votre site web, évaluant chaque aspect de sa performance. De l'expérience utilisateur à la structure technique, Identifions les opportunités d'optimisation pour renforcer votre impact en ligne.",
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