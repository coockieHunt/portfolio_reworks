import { ReactNode } from 'react';

//Icon
import DockerIcon from './assets/techIcon/docker.svg?react';
import DrizzleIcon from './assets/techIcon/drizzle.svg?react';
import framerIcon from './assets/techIcon/framer.svg?react';
import GatusIcon from './assets/techIcon/gatus.svg?react';
import NodeDotJsIcon from './assets/techIcon/nodedotjs.svg?react';
import RedisIcon from './assets/techIcon/redis.svg?react';
import ReactIcon from './assets/techIcon/react.svg?react';
import StyledComponentsIcon from './assets/techIcon/styledcomponents.svg?react';
import UmamiIcon from './assets/techIcon/umami.svg?react';
import TanstakIcon from './assets/techIcon/tanstack.svg?react';
import TypeScriptIcon from './assets/techIcon/typescript.svg?react';
import ViteIcon from './assets/techIcon/vite.svg?react';
import { text } from 'stream/consumers';
import { link } from 'fs';

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
    icon: React.ElementType;
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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#8C7DFF',
        secondary: '#4F4398',
        accentuate: '#A594FF',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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
        
        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#4ADE80',
        secondary: '#166534',
        accentuate: '#86EFAC',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',      

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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#FFB74D',
        secondary: '#B9770E',
        accentuate: '#FFE082',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#22D3EE',
        secondary: '#0E7490',
        accentuate: '#67E8F9',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#FF6696',
        secondary: '#BE185D',
        accentuate: '#FF9EBB',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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
        font_subtle: '#eeebff97',
        font_on_primary: '#ffffff',
        font_hint: '#bbbbcc',

        primary: '#60A5FA',
        secondary: '#1D4ED8',
        accentuate: '#93C5FD',

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',

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

        succes: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',
        
        border: '#ffffff',      
        border_dark: '#ffee00', 
        border_light: '#ffffff',
        
        border_subtle: '#ffee00', 


        custom: {
            margin_title: '0 0 1rem 0',
            title_line: '1.3',

            text_color: '#ffffff',
            text_color_placeHolder: '#ffffff',

            basic_text_size: '1.01em',
            basic_text_weight: '800',

            link_color: '#2986ff',
            link_color_select: '#29ff3b',

            svg_stroke: " 2.5px",

            svg_stroke_color: '#ff0202',

        }
    },
};

export const HightContrastColorSetting = {
    theme_id: 'HightContrast',
};

export const StackList: iStackItem[] = [
    {
        name: 'TypeScript',
        icon: TypeScriptIcon,
        color: '#3178C6',
        link: 'https://www.typescriptlang.org/',
        width: 20,
    },
    {
        name: 'React',
        icon: ReactIcon,
        color: '#61DAFB',
        link: 'https://react.dev/',
        width: 20,
    },
    {
        name: 'Vite',
        icon: ViteIcon,
        color: '#9553ff',
        link: 'https://vitejs.dev/',
        width: 20,
    },
    {
        name: 'Styled Components',
        icon: StyledComponentsIcon,
        color: '#DB7093',
        link: 'https://styled-components.com/',
        width: 30,
    },
    {
        name: 'Framer Motion',
        icon: framerIcon,
        color: '#0055FF',
        link: 'https://www.framer.com/motion/',
        width: 20,
    },
    {
        name: 'TanStack',
        icon: TanstakIcon,
        color: '#FF4154',
        link: 'https://tanstack.com/',
        width: 20,
    },
    {
        name: 'Node.js',
        icon: NodeDotJsIcon,
        color: '#339933',
        link: 'https://nodejs.org/',
        width: 20,
    },
    {
        name: 'Drizzle ORM',
        icon: DrizzleIcon,
        color: '#C5F74F',
        link: 'https://orm.drizzle.team/',
        width: 20,
    },
    {
        name: 'Redis',
        icon: RedisIcon,
        color: '#DC382D',
        link: 'https://redis.io/',
        width: 20,
    },
    {
        name: 'Docker',
        icon: DockerIcon,
        color: '#2496ED',
        link: 'https://www.docker.com/',
        width: 20,
    },
    {
        name: 'Gatus',
        icon: GatusIcon,
        color: '#4CAF50',
        link: 'https://gatus.io/',
        width: 20,
    },
    {
        name: 'Umami',
        icon: UmamiIcon,
        color: '#dadada',
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
export const FallbackCacheUrl =
    import.meta.env.VITE_FALLBACK_CACHE_URL="/fallback/worker_cache.json"
export const MailDefault = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};
