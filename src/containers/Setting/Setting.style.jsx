import styled, { keyframes } from 'styled-components';
import { getColorSettings, SCREEN_SIZE } from '../../config.jsx';

const rainbowShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

export const OptionsList = styled.div`
    cursor: default;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 500px;
    max-width: 100vw;
    height: 100%;
    border-left: 3px solid ${props => getColorSettings(props.theme).background_secondary};
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    transition: transform .5s ease-in-out;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${props => getColorSettings(props.theme).background_secondary};
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => getColorSettings(props.theme).primary};
        border-radius: 4px;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        padding: 60px 15px 20px 15px;
    }

    & h3 {
        font-variation-settings: "wght" 600;
        margin-bottom: 15px;
        font-size: 1.2em;
        color: white;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            font-size: 1.1em;
        }
    }
    
    &::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${props => getColorSettings(props.theme).background_tertiary};
        opacity: 0.95;
        z-index: -1;
        filter: blur(5px);
        pointer-events: none;
    }
`

export const Toggle = styled.div`
    position: absolute;
    top: 30%;
    left: -40px;
    z-index: 11;
    padding: 10px;
    cursor: pointer;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        position: fixed;
        top: auto;
        bottom: 20px;
        left: auto;
        right: 20px;
        pointer-events: auto;
    }
`

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 1100;
    color: white;
    right: 0;
    top: 0;
    display: flex;
    transform: translateX(0%);
    transition: transform .5s ease-in-out;
    height: 100vh;
    height: 100dvh;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        z-index: 1200;
    }

    &.close { 
        transform: translateX(100%); 
        
        @media (max-width: ${SCREEN_SIZE.mobile}) {
             transform: translateX(0%);
             pointer-events: none;
             
             ${OptionsList} {
                 transform: translateX(100%);
             }
        }
    }

    &.opened {
        & .Toggle {
            height: auto;
            font-size: 1.3em;
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            padding: 12px;
            border: 1px solid ${props => getColorSettings(props.theme).primary};
            box-shadow: 0 0 15px ${props => getColorSettings(props.theme).primary}40;
            
            @media (max-width: ${SCREEN_SIZE.mobile}) {
                border: none;
            }
        }

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            ${Toggle} {
                display: none;
            }
        }

        transform: translateX(0%);
    }
`

export const Action = styled.div`
    position: relative;
    z-index: 9;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    opacity: 1;
    right: 0;
    transition: all .5s ease-in-out, opacity 0.2s ease-in-out;

    &:hover { opacity: 1; }
    &.opened { opacity: 1; }
`

export const Title = styled.span`
    font-size: 1.2em;
    position: absolute;
    right: calc(200% + 10px);
    transform: rotate(-90deg);
    transform-origin: right top; 
    font-variation-settings: "wght" 300;
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    color: ${props => getColorSettings(props.theme).font};
    font-size: 1em;
    top: 50%;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        position: static;
        z-index: 50;
        transform: rotate(0deg);
        right: 0;
        color: ${props => getColorSettings(props.theme).primary};
        bottom: 0;
        padding: 12px;
        width: 50px;
        height: 50px;
        background-color: ${props => getColorSettings(props.theme).background_secondary};
        border-radius: 50%;
        border: 2px solid ${props => getColorSettings(props.theme).primary};
        box-shadow: 0 0 20px ${props => getColorSettings(props.theme).primary};
        
        & svg {
            height: 20px;
            width: 20px;
            transform: translateY(0);
        }

        /* Cache le texte desktop */
        .desktop-text { display: none; }
    }

    /* Desktop: affiche texte, cache icône */
    @media (min-width: calc(${SCREEN_SIZE.mobile} + 1px)) {
        .mobile-icon { display: none; }
    }

    & > span {
        display: flex;
        align-items: center;
        gap: 5px;
        & svg { margin-top: 5px; }
    }
`;

export const Option = styled.div`
    & .titleOption {
        font-variation-settings: "wght" 600;
        margin: 15px 0;
        font-size: 1.2em;
    }

    & .ContainerButton {
        display: flex;
        gap: 10px;
        flex-direction: column;

        & .defaultThemesContainer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;

            @media (min-width: ${SCREEN_SIZE.mobile}) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media (max-width: 400px) {
                grid-template-columns: 1fr;
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

            @media (max-width: ${SCREEN_SIZE.mobile}) {
                padding: 10px;
                gap: 8px;
                font-size: 0.8em;
            }

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
                    
                    @media (max-width: ${SCREEN_SIZE.mobile}) {
                        font-size: 1.5em;
                    }
                }

                & span {
                    @media (max-width: 400px) {
                        font-size: 0.85em;
                    }
                }
            }

            & .icon {
                font-size: 3em;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                
                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    font-size: 2em;
                    padding: 5px;
                }
            }
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
            border-radius: 5px;
            cursor: pointer;
            transition: all .3s ease-in-out;

            @media (max-width: ${SCREEN_SIZE.mobile}) {
                padding: 8px;
                gap: 8px;
            }

            &.current {
                border: 2px solid ${props => getColorSettings(props.theme).primary};
            }

            &:not(.current):hover {
                transform: scale(1.05);
                box-shadow: 0 0 10px ${props => getColorSettings(props.theme).primary};
            }

            & span {
                font-variation-settings: "wght" 500;
                font-size: 1em;
                margin-left: 10px;

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    margin-left: 5px;
                    font-size: 0.85em;
                }

                @media (max-width: 400px) {
                    font-size: 0.75em;
                    margin-left: 0;
                }
            }

            &.random {
                width: 100%;
                background: linear-gradient(90deg,
                    #ff0040 0%,
                    #ff7a00 16%,
                    #ffd400 32%,
                    #33cc33 48%,
                    #334acc 64%,
                    #3366ff 80%,
                    #a833ff 100%,
                    #ff0040 116%
                );
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

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    padding: 12px;
                    gap: 8px;
                }

                & p {
                    margin: 0;
                    font-size: .85em;
                    color: #FFFFFF; 
                    text-shadow: 
                        -1px -1px 2px #000000,
                        1px -1px 2px #000000,
                        -1px 1px 2px #000000,
                        1px 1px 2px #000000;
                    
                    @media (max-width: ${SCREEN_SIZE.mobile}) {
                        font-size: 0.7em;
                        text-align: center;
                        line-height: 1.3;
                    }

                    @media (max-width: 400px) {
                        font-size: 0.65em;
                        line-height: 1.2;
                    }
                }

                & span {
                    margin-left: 0;
                    font-variation-settings: "wght" 600;
                    color: #FFFFFF;
                    font-size: 1.3em;
                    text-shadow: 
                        -1px -1px 2px #000000,
                        1px -1px 2px #000000,
                        -1px 1px 2px #000000,
                        1px 1px 2px #000000;
                    text-align: center;
                    
                    @media (max-width: ${SCREEN_SIZE.mobile}) {
                        font-size: 1.1em;
                    }

                    @media (max-width: 400px) {
                        font-size: 0.95em;
                    }
                }
            }
        }
    }
`

export const RoundColor = styled.div`
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



export const Footer = styled.div`
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #ffffff13;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding-top: 15px;
        padding-bottom: 80px;
    }

    & p {
        font-size: 0.9em;
        font-variation-settings: "wght" 300;
        color: ${props => getColorSettings(props.theme).font_secondary};
        text-align: center;
        color: #bbbbbb73;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            font-size: 0.75em;
            line-height: 1.3;
        }
    }
`

export const infoText = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;

    & p {
        display: block;
        font-size: 0.9em;
        font-variation-settings: "wght" 300;
        text-align: left;
        color: ${props => getColorSettings(props.theme).font};
        background-color: ${props => getColorSettings(props.theme).background_secondary};
        padding: 15px;
        border-radius: 5px;
        border: 1px dotted ${props => getColorSettings(props.theme).primary};
        line-height: 1.8em;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            font-size: 0.85em;
            padding: 12px;
            line-height: 1.6em;
        }

        & strong {
            font-variation-settings: "wght" 600;
            background-color: ${props => getColorSettings(props.theme).primary};
            padding: 4px 8px;
            border-radius: 3px;
            color: ${props => getColorSettings(props.theme).font_secondary};
            margin-right: 5px;
            white-space: nowrap;
        }
    }
`

export const CloseButton = styled.div`
    display: none; 
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 1000;
    cursor: pointer;
    color: ${props => getColorSettings(props.theme).font_secondary};
    font-size: 1.5em;
    padding: 5px;
    background-color: ${props => getColorSettings(props.theme).background_secondary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        display: flex;
    }

    &:hover {
        color: ${props => getColorSettings(props.theme).primary};
        background-color: ${props => getColorSettings(props.theme).background_tertiary};
    }
`;