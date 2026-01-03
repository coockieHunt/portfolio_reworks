import { css, keyframes } from 'styled-components';
import { BORDER_RADIUS } from '../config';
import { SCREEN_SIZE } from '../config';
import styled from 'styled-components';

// Scrollbar Styles
export const ThinScroolBar = css`
    scrollbar-width: thin;
    scrollbar-color: var(--primary) transparent;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: var(--primary);
        border-radius: ${BORDER_RADIUS.round};
    }
`;

//indicator Styles
export const RoundColor = styled.div<{ $color: string }>`
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 20px;
        height: 20px;
    }
`;

// Wrapper Styles
export const Wrapper = styled.div`
    background-color: var(--background-secondary);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--primary), transparent 75%);

    display: flex;
    flex-direction: column;
    gap: 15px;

    margin-bottom: 15px;
    transition: all 0.3s ease;

    & p {
        margin: 0;
        font-size: 0.9em;
        line-height: 1.5;
        font-variation-settings: 'wght' 300;
        opacity: 0.8;
        color: inherit;
        text-align: left;
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

export const rainbowShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;
