import styled, { keyframes } from 'styled-components';
import { getColorSettings, SCREEN_SIZE } from '../../config';

const dotAnimation = keyframes`
    0% { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
    100% { content: ''; }
`;

const rainbowShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

export const AnimatedDots = styled.span`
    &::after {
        content: '';
        display: inline-block;
        animation: ${dotAnimation} 1.5s infinite steps(1);
        width: 1.5em; 
        text-align: left;
    }
`;

export const Toggle = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    z-index: 1300; 
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

    top: 30%;
    right: ${props => props.$isOpen ? '500px' : '0px'};
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        top: auto;
        bottom: 30px; 
        right: 20px;
        
        opacity: ${props => props.$isOpen ? '0' : '1'};
        pointer-events: ${props => props.$isOpen ? 'none' : 'auto'};
        transform: ${props => props.$isOpen ? 'scale(0.5)' : 'scale(1)'};
    }
`

export const Action = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => getColorSettings(props.theme).background_secondary};
    border: 1px solid ${props => getColorSettings(props.theme).primary};
    
    padding: 15px 5px;
    border-radius: 10px 0 0 10px;
    box-shadow: -2px 0 10px rgba(0,0,0,0.2);
    border-right: none;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 0;
        border: 2px solid ${props => getColorSettings(props.theme).primary};
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        &:active { transform: scale(0.9); }
    }
`

export const Title = styled.span`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    color: ${props => getColorSettings(props.theme).primary};
    display: flex; 
    align-items: center; 
    justify-content: center;

    .desktop-text { 
        font-weight: 600; 
        letter-spacing: 2px; 
        font-size: 0.9em; 
    }
    .mobile-icon { display: none; }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        writing-mode: horizontal-tb;
        transform: rotate(0deg);
        .desktop-text { display: none; }
        .mobile-icon { 
            display: flex; 
            font-size: 1.2em; 
        }
    }
`;

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 1200;
    color: white;
    right: 0; top: 0;
    
    width: 500px;
    height: 100dvh;
    border-left: 3px solid ${props => getColorSettings(props.theme).background_secondary};
    
    display: flex; flex-direction: column;

    transition: transform .5s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: -5px 0 25px rgba(0,0,0,0.5);

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        top: 50%; right: 50%;
        transform: translate(50%, -50%);
        width: 90vw;
        height: 95dvh;
        border-radius: 5px;
        border: 1px solid ${props => getColorSettings(props.theme).primary};
        border-left: 1px solid ${props => getColorSettings(props.theme).primary};
    }

    &.close { 
        transform: translateX(100%); 
        @media (max-width: ${SCREEN_SIZE.mobile}) {
            top: 0%; right: -50%;
            transform: translate(50%, -50%);
        }
    }

    &::after {
        content: ""; 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
        background-color: ${props => getColorSettings(props.theme).background_tertiary};
        z-index: -1; 
        pointer-events: none; 
        border-radius: inherit;
    }
`

export const SettingHeader = styled.div`
    flex-shrink: 0; 
    padding: 15px 20px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    border-bottom: 1px dashed #ffffff18;

    @media (max-width: ${SCREEN_SIZE.mobile}) {border-radius: 15px 15px 0 0;}
    
    & h3 { 
        margin: 0; 
        font-size: 1.2em; 
        color: white; 
        font-variation-settings: "wght" 600;
    }
`;

export const SettingFooter = styled.div`
    flex-shrink: 0; 
    padding: 15px; 
    text-align: center;
    border-top: 1px dashed #ffffff49;
   
    @media (max-width: ${SCREEN_SIZE.mobile}) { border-radius: 0 0 15px 15px; }

    & p { 
        margin: 0; 
        font-size: 0.9em; 
        color: #b0b0b0; 
        opacity: 0.7; 
        font-variation-settings: "wght" 300;
    }
`;

export const ScrollableContent = styled.div`
    flex-grow: 1; overflow-y: auto; overflow-x: hidden; padding: 20px;
    
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { 
        background: ${props => getColorSettings(props.theme).primary}; 
        border-radius: 4px; 
    }
`;

export const CloseButton = styled.div`
    cursor: pointer; 
    font-size: 1.5em; 
    color: ${props => getColorSettings(props.theme).secondary};
    width: 35px; 
    height: 35px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border-radius: 50%;
    &:hover { background-color: ${props => getColorSettings(props.theme).background_tertiary}; color: ${props => getColorSettings(props.theme).primary}; }
`;

export const Option = styled.div`
    & .titleOption {
        font-variation-settings: "wght" 600;
        margin: 15px 0;
        font-size: 1.2em;
        color: white;
    }

    & .ContainerButton {
        display: flex; gap: 10px; flex-direction: column;

        & .defaultThemesContainer {
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 8px;
            @media (max-width: 400px) { grid-template-columns: 1fr; }
        }

        & .themeButton {
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            display: flex;
            align-items: center; 
            justify-content: flex-start;
            flex-direction: row; 
            gap: 10px; 
            padding: 10px; 
            width: 100%;
            border-radius: 5px; cursor: pointer; 
            transition: all .3s ease-in-out;
            border: 1px solid transparent; 

            &.current {border: 2px solid ${props => getColorSettings(props.theme).primary};}

            &:not(.current):hover {
                transform: scale(1.05);
                box-shadow: 0 0 10px ${props => getColorSettings(props.theme).primary};
            }

            & span {
                font-variation-settings: "wght" 500; 
                font-size: 1em; 
                margin-left: 10px;
                @media (max-width: ${SCREEN_SIZE.mobile}) { margin-left: 5px; font-size: 0.85em; }
            }

            &.random {
                width: 100%;
                background: linear-gradient(90deg, #ff0040 0%, #ff7a00 16%, #ffd400 32%, #33cc33 48%, #334acc 64%, #3366ff 80%, #a833ff 100%, #ff0040 116%);
                background-size: 200% 200%;
                animation: ${rainbowShift} 4s ease infinite;
                color: #000000; 
                font-size: 1em;
                justify-content: center; 
                display: flex; 
                align-items: center;
                border-radius: 5px; 
                flex-direction: column; 
                gap: 10px; 
                padding: 15px;

                & p {
                    margin: 0; 
                    font-size: .85em; 
                    color: #FFFFFF;
                    text-shadow: -1px -1px 2px #000000, 1px -1px 2px #000000, -1px 1px 2px #000000, 1px 1px 2px #000000;
                    text-align: center;
                }

                & span {
                    margin-left: 0; 
                    font-variation-settings: "wght" 600; 
                    color: #FFFFFF; 
                    font-size: 1.3em;
                    text-shadow: -1px -1px 2px #000000, 1px -1px 2px #000000, -1px 1px 2px #000000, 1px 1px 2px #000000;
                    text-align: center;
                }
            }
        }

        & .counter {
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            padding: 15px; 
            border-radius: 5px;
            border: 1px dotted ${props => getColorSettings(props.theme).primary};
            margin-top: 10px; 
            display: flex; 
            align-items: center; 
            justify-content: space-around;
            gap: 10px; 
            font-size: 0.9em; 
            flex-wrap: wrap;

            & .number {
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                gap: 5px; 
                text-align: center;
                & .count {
                    font-weight: 800; 
                    font-size: 2em;
                    color: ${props => getColorSettings(props.theme).primary};
                    min-width: 3ch
                }
            }
            & .icon { font-size: 3em; padding: 5px; }
        }
    }
`

export const RoundColor = styled.div<{ $color: string }>`
    flex-shrink: 0; 
    width: 25px; 
    height: 25px; 
    border-radius: 50%; 
    background-color: ${props => props.$color}; 
    @media (max-width: ${SCREEN_SIZE.mobile}) { 
        width: 20px; 
        height: 20px; 
    }
`

export const infoText = styled.div`
    display: flex;
    gap: 10px; 
    flex-direction: column; 
    margin-top: 20px;

    & p {
        display: block; 
        font-size: 0.9em; 
        font-variation-settings: "wght" 300;
        text-align: left;
        color: #ffffff;
        background-color: ${props => getColorSettings(props.theme).background_secondary};
        padding: 15px;
        border-radius: 5px;
        border: 1px dotted ${props => getColorSettings(props.theme).primary};
        line-height: 1.8em;

        & strong {
            font-variation-settings: "wght" 600;
            background-color: ${props => getColorSettings(props.theme).primary};
            padding: 4px 8px;
            border-radius: 3px;
            color: #000000;
            margin-right: 5px; 
            white-space: nowrap;
        }
    }
`
