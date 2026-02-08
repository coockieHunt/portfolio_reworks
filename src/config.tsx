import { ReactNode } from 'react';

//Icon
import {
    Activity,
    Atom,
    BarChart3,
    Braces,
    Brush,
    Database,
    FileCode,
    Move,
    Route,
    Send,
    Server,
    Terminal,
} from 'lucide-react';

// interface
export interface iColorSettings {
    display_name: string;
    background: string;
    background_secondary: string;
    background_color: string;
    background_elevated: string;

    font: string;
    font_on_primary: string;
    font_subtle: string;
    font_hint: string;

    primary: string;
    secondary: string;
    accentuate: string;

    border: string;
    border_light: string;
    border_dark: string;
    border_subtle: string;
}

export interface iStackItem {
    name: string;
    icon: ReactNode;
    color: string;
    link: string;
    width: number;
}

export const ContactEmail = 'contacts@jonathangleyze.com';

//CONSTANTS
// 6.94:1 global ~= themes scores for contrast accessibility end 2.16:1 minimum
export const COLOR_SETTING = {
    default: {
        display_name: 'Nuit',
        
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#09011f',
        background_elevated: '#0a0908',

        font: '#ddd9f7',
        font_subtle: '#eeebffc0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#8C7DFF',
        secondary: '#4F4398',
        accentuate: '#A594FF',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#8c7dffb0',
        border_light: '#6B5C8C',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    red: {
        display_name: 'Magma',

        background: '#121212',
        background_secondary: '#171717',
        background_color: '#1f0a06',
        background_elevated: '#0a0604',

        font: '#f7e3e0',
        font_subtle: '#ffebe8c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#FF7B6E',
        secondary: '#B03C2E',
        accentuate: '#FFAFA3',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#ff7b6eb0',
        border_light: '#C25C52',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    green: {
        display_name: 'Matrix',
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#060f07',
        background_elevated: '#080d0a',

        font: '#e8ffed',
        font_subtle: '#e8ffedC0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#4ADE80',
        secondary: '#166534',
        accentuate: '#86EFAC',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#4ade80b0',
        border_light: '#3A7F5B',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    yellow: {
        display_name: 'Électrique',
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#3f3600',
        background_elevated: '#0f0d09',

        font: '#fff8e8',
        font_subtle: '#fff8e8c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#FFB74D',
        secondary: '#B9770E',
        accentuate: '#FFE082',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#ffb74db0',
        border_light: '#CC8C3A',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    cyan: {
        display_name: 'Cyber Wave',
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#040f15',
        background_elevated: '#070f10',

        font: '#e8fbff',
        font_subtle: '#e8fbffc0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#22D3EE',
        secondary: '#0E7490',
        accentuate: '#67E8F9',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#22d3eeb0',
        border_light: '#188BA8',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    pink: {
        display_name: 'Dreams',
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#150608',
        background_elevated: '#0a0708',

        font: '#ffebf3',
        font_subtle: '#ffebf3c0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#FF6696',
        secondary: '#BE185D',
        accentuate: '#FF9EBB',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#ff6696b0',
        border_light: '#CC4D7A',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    ice: {
        display_name: 'Frost',
        background: '#121212',
        background_secondary: '#0d0d0d',
        background_color: '#050810',
        background_elevated: '#080f0f',

        font: '#ebf3ff',
        font_subtle: '#ebf3ffc0',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#60A5FA',
        secondary: '#1D4ED8',
        accentuate: '#93C5FD',

        border: 'rgba(255, 255, 255, 0.12)',
        border_dark: '#60a5fab0',
        border_light: '#4984c7',
        border_subtle: 'color-mix(in srgb, var(--primary), transparent 70%)',
    },

    HighContrast: {
        display_name: 'Haut Contraste',
        
        background: '#000000',
        background_secondary: '#000000',
        background_color: '#000000',
        background_elevated: '#000000',

        font: '#ffffff',
        font_subtle: '#dddddd',
        font_on_primary: '#000000',
        font_hint: '#bbbbbb',

        primary: '#ffee00',     
        secondary: '#00ffff',  
        accentuate: '#fff566',

        border: '#ffffff',      
        border_dark: '#ffee00', 
        border_light: '#ffffff',
        
        border_subtle: '#ffee00', 
    },
};

export const HightContrastColorSetting = {
    theme_id: 'HightContrast',
};

export const StackList: iStackItem[] = [
    {
        name: 'Gatus',
        icon: <Activity />,
        color: '#4CAF50',
        link: 'https://gatus.io/',
        width: 20,
    },
    {
        name: 'JavaScript',
        icon: <Braces />,
        color: '#F0DB4F',
        link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
        width: 20,
    },
    {
        name: 'Styled Components',
        icon: <Brush />,
        color: '#d485c2',
        link: 'https://styled-components.com/',
        width: 40,
    },
    {
        name: 'HTML5',
        icon: <FileCode />,
        color: '#E34F26',
        link: 'https://developer.mozilla.org/fr/docs/Web/Guide/HTML/HTML5',
        width: 20,
    },
    {
        name: 'API RESTful',
        icon: <Server />,
        color: '#27ad0c',
        link: 'https://restfulapi.net/',
        width: 20,
    },
    {
        name: 'React Js',
        icon: <Atom />,
        color: '#61DAFB',
        link: 'https://fr.react.dev/',
        width: 20,
    },
    {
        name: 'Framer Motion',
        icon: <Move />,
        color: '#0055FF',
        link: 'https://www.framer.com/motion/',
        width: 20,
    },
    {
        name: 'Node Js',
        icon: <Terminal />,
        color: '#339933',
        link: 'https://nodejs.org/',
        width: 20,
    },
    {
        name: 'Express',
        icon: <Route />,
        color: '#bdb43e',
        link: 'https://expressjs.com/fr/',
        width: 20,
    },
    {
        name: 'Node Mailer',
        icon: <Send />,
        color: '#0f9dce',
        link: 'https://nodemailer.com/about/',
        width: 20,
    },
    {
        name: 'Redis',
        icon: <Database />,
        color: '#DC382D',
        link: 'https://redis.com/',
        width: 20,
    },
    {
        name: 'Umami',
        icon: <BarChart3 />,
        color: '#bdbdbd',
        link: 'https://umami.is/',
        width: 20,
    },
];

export const SCREEN_SIZE = {
    mobile: '850px',
    tablet: '1150px',
};

export const BORDER_RADIUS = {
    small: '4px',
    medium: '6px',
    large: '8px',
    xlarge: '10px',
    xxlarge: '12px',
    xxxlarge: '15px',
    icon: '25%',
    round: '50%',
    full: '100%',
};

export const Blog ={
    POSTS_PER_PAGE: 5,
}

export const ApiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const AssetsBaseUrl =
    import.meta.env.VITE_ASSETS_BASE_URL || 'http://localhost:3001/assets';
export const MailDefault = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};
