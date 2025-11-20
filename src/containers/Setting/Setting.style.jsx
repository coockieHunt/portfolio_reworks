import styled, { keyframes } from 'styled-components';
import { getColorSettings, SCREEN_SIZE } from '../../config.jsx';

const rainbowShift = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

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

    @media ( max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        z-index: 1200;
    }


    &.close{transform: translateX(100%);}

    &.opened{
        & .Toggle{
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            padding: 10px 20px;
            border-radius: 5px;
            border: 2px solid ${props => getColorSettings(props.theme).primary};
            @media ( max-width: ${SCREEN_SIZE.mobile}) {
                border: none;   
                border-radius: inherit;
            }
            
        }
        transform: translateX(0%);
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
        top: auto;
        bottom: 80px;
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

    &:hover{opacity: 1;}
    &.opened{opacity: 1;}
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
        z-index: 50;
        transform: rotate(0deg);
        right: calc(0);
        right: 0;

        color: ${props => getColorSettings(props.theme).primary};

        bottom: 0;
        padding: 30px;
        width: 20%;
        height: auto;

        background-color: ${props => getColorSettings(props.theme).background_secondary};
        border-radius: 50%;
        border: 2px solid ${props => getColorSettings(props.theme).primary};
        box-shadow: 0 0 20px ${props => getColorSettings(props.theme).primary};
        
        & svg {
            height: 20px; width: 20px;
            transform: translateY(-15%);
        }

    }

    & > span {
        display: flex;
        align-items: center;
        gap: 5px;
        

    & svg {margin-top: 5px;}}
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

        & .themeButton {
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            gap: 10px;
            padding: 10px;

            transition: all .3s ease-in-out;

            &.current {border: 2px solid ${props => getColorSettings(props.theme).primary};}

            &:not(.current):hover {
                transform: scale(1.05);
                box-shadow: 0 0 10px ${props => getColorSettings(props.theme).primary};
            }

            & span {
                font-variation-settings: "wght" 500;
                font-size: 1em;

                margin-left: 20px;
            }

            &.random {
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


                & p {
                    margin: 0;
                    font-size: .85em;
                    color: #FFFFFF; 
                    text-shadow: 
                        -1px -1px 2px #000000,
                        1px -1px 2px #000000,
                        -1px 1px 2px #000000,
                        1px 1px 2px #000000;
                }


                & span {
                    margin-left: 0;
                    font-variation-settings: "wght" 600;
                    color: #FFFFFF;
                    font-size: 1.5em;
                    text-shadow: 
                        -1px -1px 2px #000000,
                        1px -1px 2px #000000,
                        -1px 1px 2px #000000,
                        1px 1px 2px #000000;
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
`


export const OptionsList = styled.div`
    cursor: pointer;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 500px;
    height: 100%;
    border-left: 3px solid ${props => getColorSettings(props.theme).background_secondary};
    padding: 30px 30px;
    position: relative;
    overflow: hidden;

    @media ( max-width: ${SCREEN_SIZE.mobile}) {width: 100%;}

    & h3{
        font-variation-settings: "wght" 600;
        margin-bottom: 15px;
        font-size: 1.2em;
    }
    
    &::after {
        content: "";
        position: absolute;
        top: -5px;
        left: -5px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        background-color: ${props => getColorSettings(props.theme).background_tertiary};
        opacity: 0.95;
        z-index: -1;

        filter: blur(5px);
    }
`
export const Footer = styled.div`
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #ffffff13;

    & p {
        font-size: 0.9em;
        font-variation-settings: "wght" 300;
        color: ${props => getColorSettings(props.theme).font_secondary};
        text-align: center;
        color: #bbbbbb73;
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
        text-align: center;
        color: ${props => getColorSettings(props.theme).font};

        background-color: ${props => getColorSettings(props.theme).background_secondary};
        padding: 10px;
        border-radius: 5px;

        border: 1px dotted ${props => getColorSettings(props.theme).primary};
        padding: 20px;

        text-align: left;

        line-height: 2em;

        & strong {
            font-variation-settings: "wght" 600;
            background-color: ${props => getColorSettings(props.theme).primary};
            padding: 4px 8px;
            border-radius: 3px;
            color: ${props => getColorSettings(props.theme).font_secondary};

            margin-right: 5px;
        }
    }
`

export const CloseButton = styled.div`
    display: none; 
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 100;
    cursor: pointer;
    color: ${props => getColorSettings(props.theme).font_secondary};
    
    @media ( max-width: ${SCREEN_SIZE.mobile}) {display: block;}

    &:hover {color: ${props => getColorSettings(props.theme).primary};}
`;

