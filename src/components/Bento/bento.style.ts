import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BORDER_RADIUS, SCREEN_SIZE } from '@/config.js';

export const Wrapper = styled.div<{ color?: string }>`
    background-color: ${(props) => props.color || 'inherit'};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 16px;

    height: 100%;
    width: 100%;

    & .card-large{ grid-column: span 2; grid-row: span 2; } 
    & .card-wide{ grid-column: span 2; }          
    & .card-tall{ grid-row: span 2; }                      
    & .card-small{ grid-column: span 1; }  


    @media (max-width: ${SCREEN_SIZE.tablet}) {
        grid-template-columns: repeat(2, 1fr);
        & .card-large{ grid-column: span 2; grid-row: span 2; }
        & .card-wide{ grid-column: span 2; }
        & .card-tall{ grid-row: span 1; }
        & .card-small{ grid-column: span 1; }
    }
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        grid-template-columns: repeat(1, 1fr);
        & .card-large{ grid-column: span 1; grid-row: span 2; }
        & .card-wide{ grid-column: span 1; }
        & .card-tall{ grid-row: span 1; }
        & .card-small{ grid-column: span 1; }
    }
`;

export const Frame = styled.div<{ BorderColor?: string }>`
    border: 1px solid ${props => props.BorderColor || 'var(--border-dark)'};
    border-bottom: 5px solid ${props => props.BorderColor || 'var(--border-dark)'};
    border-radius: ${BORDER_RADIUS.large};
    background-color: color-mix(in srgb, var(--background-color), transparent 95%);
    position: relative;
    user-select: none;
    cursor: default;
    font-family: "Source Code Pro", monospace;
    overflow: hidden;

    @keyframes bentoCursorWavePulse {
        0% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(0.5);
        }
        65% {
            opacity: 0.15;
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.5);
        }
    }

    & .bento-wave-layer {
        position: absolute;
        top: 50%;
        left: 50%;
        pointer-events: none;
        opacity: 0.9;
        transition: transform 260ms ease, opacity 260ms ease;
    }

    & .bento-wave {
        position: absolute;
        width: 8px;
        height: 8px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        border: 1.5px solid var(--cursor-wave-color, var(--primary));
        opacity: 0;
        animation: bentoCursorWavePulse 2s ease-out infinite;
    }

    & .bento-wave:nth-child(2) {
        animation-delay: 0.5s;
    }

    & .bento-wave:nth-child(3) {
        animation-delay: 1s;
    }

    & .bento-wave-layer.bento-wave-intense {
        opacity: 1;
        transform: scale(1.07);
    }

    & .bento-wave-layer.bento-wave-intense .bento-wave {
        animation-duration: 1s;
    }

    & .bento-wave-layer.bento-wave-intense .bento-wave:nth-child(1) {
        animation-delay: 0s;
    }

    & .bento-wave-layer.bento-wave-intense .bento-wave:nth-child(2) {
        animation-delay: 0.25s;
    }

    & .bento-wave-layer.bento-wave-intense .bento-wave:nth-child(3) {
        animation-delay: 0.5s;
    }

    & .head {
        position: absolute;
        top: 15px;
        right: 20px;
        opacity: 0.5;
        overflow: hidden;
        height: 24px;
        display: flex;
        align-items: center;
        z-index: 20;
        pointer-events: auto;
    }

     & .frame {
        height: 100%;
        width: 100%;
        padding: 20px;
    }

    & .footer {
        position: absolute;
        bottom: 15px;
        left: 20px;
        z-index: 10;
        display: flex;
        align-items: center;
        opacity: 0.5;
    }


    @media (max-width: ${SCREEN_SIZE.tablet}) {
        & .head {
            top: 10px;
            right: 15px;
            font-size: 0.9em;
            width: 100%;

            padding: 0 10px;

            right: 0;
        }
        & .footer {
            bottom: 10px;
            left: 15px;
            font-size: 0.9em;
            width: 100%;
            text-align: center;
            left: 0;

            padding: 0 10px;

        }
    }
`;

export const BentoLabel = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 50%;
    background: transparent;
    letter-spacing: 0.06em;
    font-weight: 500;
    line-height: 1;
    gap: 10px;
    font-size: 1em;

    & svg {
        color: var(--primary);
    }
`;

export const BentoButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1em;
    padding: 3px 9px;
    line-height: 1;
    transition: all 0.2s ease;
    background: transparent;

    & svg {
        color: var(--primary);
    }

    &:hover {
        color: var(--secondary);
        transform: scale(1.05);
    }

    html.reduced-motion &:hover {
        transform: none;
    }
`;

export const StateDot = styled(motion.span)`
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &  svg {
        width: 18px;
        height: 18px;
    }
`;

export const BentoAction = styled(motion.div)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1em;
    color: var(--text-color);
    transition: all 0.2s ease;

    & svg {
        color: var(--primary);
    }

    html.reduced-motion & {
        transition: none;
    }
`;