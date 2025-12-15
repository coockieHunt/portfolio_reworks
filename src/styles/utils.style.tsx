import { css, keyframes } from 'styled-components';
import { BORDER_RADIUS, getColorSettings } from '../config';

// Scrollbar Styles
export const ThinScroolBar = css`
    scrollbar-width: thin;
    scrollbar-color: ${props => getColorSettings(props.theme).primary} transparent;
    
    &::-webkit-scrollbar { width: 6px; height: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => getColorSettings(props.theme).primary};
        border-radius: ${BORDER_RADIUS.round};
    }
`;

// Animations
export const fadeInTranslate = keyframes`
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1;}
`;

export const fadeInOut = keyframes`
    0% { opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { opacity: 0; }
`;

export const slideUp = keyframes`
    0%, 80% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
`;

export const slideDown = keyframes`
    0%, 80% { transform: translateY(0); }
    100% { transform: translateY(100%); }
`;


export const ShowOutContainerRight = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50%) translateX(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
    }
`;

export const BorderPulseLight = keyframes`
    0% { border-bottom-color: #ffffff21;}
    50% { border-bottom-color:  #ffffff60;} 
    100% { border-bottom-color: #ffffff21;}
`;