import { ReactNode } from "react";

//Icon
import { 
    SiExpress,
    SiFramer,
    SiNodedotjs,
    SiReact,
    SiHtml5,
    SiStyledcomponents,
    SiUptimekuma,
    SiRedis,
    SiUmami
} from "react-icons/si";
import { AiOutlineApi, AiOutlineSend  } from "react-icons/ai";
import { FaJs } from "react-icons/fa";

// interface
export interface iColorSettings {
    display_name: string;
    background: string;
    background_secondary: string;
    background_tertiary: string;

    font: string;
    font_on_primary: string;
    font_subtle: string;
    font_hint: string;

    primary: string;
    secondary: string;
    accentuate: string;

    border: string;
}

export interface iStackItem {
    name: string, 
    icon: ReactNode,
    color: string,
    link: string, 
    width: number
};

export const ContactEmail = "contacts@jonathangleyze.com";

//CONSTANTS
// 6.94:1 global ~= themes scores for contrast accessibility end 2.16:1 minimum
export const COLOR_SETTING = {
    default: {
        display_name: "Nuit",
        background: '#303134',
        background_secondary: '#221f30',
        background_tertiary: '#1c1933',

        font: '#ddd9f7',
        font_subtle: '#eeebffc0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: "#8C7DFF", 
        secondary: "#4F4398", 
        accentuate: '#A594FF', 

        border: "rgba(255, 255, 255, 0.12)"
    },

    red: {
        display_name: "Magma",
        background: '#303134',
        background_secondary: '#2c1510',
        background_tertiary: '#4a1712',

        font: '#f7e3e0',
        font_subtle: '#ffebe8c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',


        primary: "#FF7B6E",
        secondary: "#B03C2E",
        accentuate: '#FFAFA3',

        border: "#FF7B6E" 
    },

    green: {
        display_name: "Matrix",
        background: '#303134',
        background_secondary: '#172419',
        background_tertiary: '#1f4224',

        font: '#e8ffed',
        font_subtle: '#e8ffedC0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: "#4ADE80", 
        secondary: "#166534",
        accentuate: '#86EFAC',

        border: "#4ADE80"
    },

    yellow: {
        display_name: "Électrique",
        background: '#303134',
        background_secondary: '#2c2415',
        background_tertiary: '#4a3d17',

        font: '#fff8e8',
        font_subtle: '#fff8e8c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: "#FFB74D", 
        secondary: "#B9770E",
        accentuate: '#FFE082',

        border: "#FFB74D"
    },

    cyan: {
        display_name: "Cyber Wave",
        background: '#303134',
        background_secondary: '#0d2b2e',
        background_tertiary: '#134147',

        font: '#e8fbff',
        font_subtle: '#e8fbffc0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: "#22D3EE",
        secondary: "#0E7490",
        accentuate: '#67E8F9',
        
        border: "#22D3EE"
    },

    pink: {
        display_name: "Dreams",
        background: '#303134',
        background_secondary: '#2a1525',
        background_tertiary: '#4a1f3d',
        
        font: '#ffebf3',
        font_subtle: '#ffebf3c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: "#FF6696", 
        secondary: "#BE185D",
        accentuate: '#FF9EBB',
        
        border: "#FF6696"
    },

    ice: {
        display_name: "Frost",
        background: '#303134',
        background_secondary: '#0f1c2e',
        background_tertiary: '#1a2f4a',

        font: '#ebf3ff',
        font_subtle: '#ebf3ffc0',
        font_on_primary: '#ffffff',
        
        primary: "#60A5FA", 
        secondary: "#1D4ED8",
        accentuate: '#93C5FD',
        
        border: "#60A5FA"
    },

    HighContrast: {
        display_name: "Haut Contraste",
        background: '#000000',
        background_secondary: '#1a1a1a',
        background_tertiary: '#2a2a2a',

        font: '#ffffff',
        font_subtle: '#fdf6f6d0',
        font_on_primary: '#000000',
        
        primary: "#ffee00", 
        secondary: "#2600ff",
        accentuate: '#fff566',
        
        border: "#ffee00"
    }
};

export const HightContrastColorSetting = {
    theme_id: 'HightContrast'
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


export const StackList: iStackItem[] = [
	{
		name: 'Uptime Kuma', 
		icon: <SiUptimekuma />,
		color: '#4CAF50',
		link: 'https://uptime.kuma.pet/', 
		width: 20
	},
	{
		name: 'JavaScript', 
		icon: <FaJs />,
		color: '#F0DB4F',
		link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', 
		width: 20
	},
	{
		name: 'Styled Components', 
		icon: <SiStyledcomponents />,
		color: '#d485c2',
		link: 'https://styled-components.com/', 
		width: 40
	},
	{
		name: 'HTML5', 
		icon: <	SiHtml5 />,
		color: '#E34F26',
		link: 'https://developer.mozilla.org/fr/docs/Web/Guide/HTML/HTML5', 
		width: 20
	},
	{
		name: 'API RESTful', 
		icon: <AiOutlineApi />,
		color: '#27ad0c',
		link: 'https://restfulapi.net/', 
		width:  20
	},
    { 
		name: 'React Js', 
		icon: <SiReact />,
		color: '#61DAFB',
		link: 'https://fr.react.dev/', 
		width:  20
	},
    { 
		name: 'Framer Motion', 
		icon: <SiFramer />,
		color: '#0055FF',
		link: 'https://www.framer.com/motion/', 
		width: 20 
	},
    { 
		name: 'Node Js', 
		icon: <SiNodedotjs />,
		color: '#339933',
		link: 'https://nodejs.org/', 
		width: 20 
	},
    { 
		name: 'Express', 
		icon: <SiExpress />,
		color: '#bdb43e',
		link: 'https://expressjs.com/fr/', 
		width: 20 
	},
    { 
		name: 'Node Mailer', 
		icon: <AiOutlineSend  />,
		color: '#0f9dce',
		link: 'https://nodemailer.com/about/', 
		width: 20
	},
    { 
		name: 'Redis', 
		icon: <SiRedis />,
		color: '#DC382D',
		link: 'https://redis.com/', 
		width: 20 
	},
    { 
		name: 'Umami', 
		icon: <SiUmami  />,
		color: '#bdbdbd',
		link: 'https://umami.is/', 
		width: 20 
	},
];

export const SCREEN_SIZE = {
    mobile: '850px',
    tablet: '1150px'
}

export const BORDER_RADIUS = {
    small: '4px',       
    medium: '6px',       
    large: '8px',        
    xlarge: '10px',     
    xxlarge: '12px',     
    xxxlarge: '15px',    
    icon: '25%',        
    round: '50%',       
    full: '100%'  
}

export const getColorSettings = (theme: any): iColorSettings => {
    if(!theme) return COLOR_SETTING.default;
    const themeName = theme.theme || theme;
    return COLOR_SETTING[themeName as string] || COLOR_SETTING.default;
};

export const GetHightContrastSetting = (theme: any) => {
    return HightContrastColorSetting;
};


export const ApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
export const MailDefault =  { firstName: '', lastName: '', email: '', message: '' };
