import styled from 'styled-components';
import { getColorSettings, SCREEN_SIZE } from '../../config.jsx';

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 10;
    color: white;
    right: 0;
    display: flex;
    transform: translateX(0%);
    transition: transform .5s ease-in-out;
    height: 100vh; 
	z-index: 1002;

    &.close{
        transform: translateX(100%);
    }

    &.opened{
        & .Toggle{
            background-color: ${props => getColorSettings(props.theme).background_secondary};
            padding: 10px 20px;
            border-radius: 5px;
            border: 2px solid ${props => getColorSettings(props.theme).primary}
        }
    }
`

export const Toggle = styled.div`
    position: absolute;
    top: 30%;
    left: -40px;
    z-index: 11;

    padding: 10px;
    cursor: pointer;
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
    opacity: 1;
    color: ${props => getColorSettings(props.theme).font};

    & > span {
        display: flex;
        align-items: center;
        gap: 5px;

    & svg {margin-top: 5px;}}
`;

export const Option = styled.div`

    & .titleOption {
        font-variation-settings: "wght" 600;
        margin-bottom: 15px;
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
            gap: 15px 10px;
            padding: 10px;

            transition: all .3s ease-in-out;

            &.current {border: 2px solid ${props => getColorSettings(props.theme).primary};}

            &:not(.current):hover {
                transform: scale(1.05);
                box-shadow: 0 0 10px ${props => getColorSettings(props.theme).primary};
            }

            & span {
                font-variation-settings: "wght" 500;
                font-size: 1.3em;

                margin-left: 20px;
            }
        }
    }

`


export const RoundColor = styled.div`
    flex-shrink: 0;
    width: 30px;
    height: 30px;
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
    height: 100vh;
    border: 3px solid ${props => getColorSettings(props.theme).background_secondary};
    padding: 30px 30px;
    position: relative;
    overflow: hidden;

    @media ( max-width: ${SCREEN_SIZE.mobile}) {width: 100%;}

    & h3{
        font-variation-settings: "wght" 600;
        margin-bottom: 15px;
        font-size: 1.5em;
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
        color: #bbb;
    }
`

export const infoText = styled.div`
    margin-top: 20px;

    & p {
        display: block;
        font-size: 0.9em;
        font-variation-settings: "wght" 300;
        color: ${props => getColorSettings(props.theme).font_secondary};
        text-align: center;
        color: #bbb;

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
            color: white;

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

