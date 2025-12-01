import styled from 'styled-components';
import { getColorSettings, GetLightSetting, SCREEN_SIZE } from "../../config";

export const Container = styled.div`
    margin: 0 0 100px 0;
    color: ${(props) => GetLightSetting(props.color).font}; 
    position: relative;
    & svg {
        position: absolute; 
        top: 50%; 
        left: 50%; 
        z-index: -1; 
        transform: translate(-50%, -50%);
        width: 250vw; 
        height: auto;
        pointer-events: none;

    }

    @media (max-width: ${SCREEN_SIZE.tablet}) {margin: 0 0 80px 0;}

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        margin: 0 0 60px 0;
        & svg {width: 300%;}
    }
`;


export const TimeLineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px 0;
    overflow: visible;
    
    &::before {
        content: ''; 
        position: absolute;
        background-color: ${(props) => getColorSettings(props.theme).primary};
        width: 3px;
        height: 10%;
        transition: height 0.5s ease-in-out;
        will-change: height;
        box-shadow: 0 0 10px ${(props) => getColorSettings(props.theme).primary}40;
    }

    &.visible::before {height: 97%;}
    
    &::after {
        content: '';
        position: absolute;
        border-left: 3px solid ${(props) => getColorSettings(props.theme).primary};
        border-bottom: 3px solid ${(props) => getColorSettings(props.theme).primary};
        height: 40px;
        width: 40px;
        transform: rotate(-45deg);
        bottom: -50px;
    }
 
    & > div:nth-child(2n+1) { 
        transform: translateX(55%) scale(1);
        will-change: transform;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -5%;
            height: 1px;
            width: 5%;
            z-index: -1;
            opacity: 1;
            border-bottom: 1px dashed ${(props) => getColorSettings(props.theme).primary};
            transition: opacity 0.2s ease;
        }

        & .dot {
            left: -5%; 
            transform: translate(-50%, -50%); 
            margin-top: 2px;
            transition: left 0.3s ease, transform 0.3s ease;
        }

        &:hover {
            transform: translateX(55%) scale(1.1);
            border-radius: 0px 5px 5px 0px;
            
            &::before {opacity: 0;}
            
            & .dot {
                left: 0%; 
                transform: translate(-50%, -50%);
            }
        }
    }

    & > div:nth-child(2n) { 
        transform: translateX(-55%) scale(1);
        will-change: transform;


        &::before {
            content: '';
            position: absolute;
            top: 50%;
            right: -5%;
            height: 1px;
            width: 5%;
            z-index: -1;
            opacity: 1;
            border-bottom: 1px dashed ${(props) => getColorSettings(props.theme).primary};
            transition: opacity 0.2s ease;
        }

        & .dot {
            right: -5%; 
            margin-right: -2px;
            left: auto;
            transform: translate(50%, -50%);
            transition: right 0.3s ease, transform 0.3s ease;
        }

        &:hover {
            border-radius: 5px 0px 0px 5px;
            transform: translateX(-55%) scale(1.1);
            
            &::before {opacity: 0;}
            
            & .dot {right: 0%; transform: translate(50%, -50%);}
        }
    }

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        & > div:nth-child(2n+1),
        & > div:nth-child(2n) {
            width: 60%; 
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 20px 0;
        &::before {width: 2px;}
        
        &::after {
            height: 30px;
            width: 30px;
            bottom: -40px;
        }
        
        & > div:nth-child(2n+1),
        & > div:nth-child(2n) { 
            transform: translateX(0) !important;
            width: 85%;
            max-width: 500px;
            
            &::before {display: none;}
            
            & .dot {display: none;}
            
            &:hover {
                transform: translateX(0) scale(1.03) !important;
                border-radius: 5px !important;
            }
        }
    }
`;


export const TimeLineItemContainer = styled.div`
    display: flex; 
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 15px 40px;
    margin: 5px 0;
    border-radius: 5px;
    width: 43%;
    position: relative;
    border: 1px solid ${(props) => getColorSettings(props.theme).primary};
    border-bottom: 4px solid ${(props) => getColorSettings(props.theme).primary};
    position: relative;
    
    cursor: default;
    transition: transform 0.3s ease, border-radius 0.3s ease; 

    &::after{
        content: '';
        position: absolute;
        inset: 0;
        transform-origin: center;
        pointer-events: none;
        opacity: .6;    
        background-color: ${(props) => getColorSettings(props.theme).background_secondary};
        z-index: -1;
    }


    & .DotBg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden; 

        &::before {
            content: '';
            position: absolute;
            top: -20%;
            left: -20%;
            right: -20%;
            bottom: -20%;
            background-color: ${(props) => getColorSettings(props.theme).background_secondary};
            z-index: 0;
            opacity: 0.9;
            transition: opacity 0.3s ease;
            pointer-events: none;
            will-change: opacity;
        }
    }

    & .dot {
        content: ' ';
        position: absolute;
        top: 50%; 
        z-index: 10; 
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: ${(props) => getColorSettings(props.theme).primary};
        box-shadow: 0 0 10px ${(props) => getColorSettings(props.theme).primary};
    }

    &:hover { 
        & .DotBg::before { opacity: 1; } 
        &::after {
            opacity: .8;
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        min-height: 80px;
        padding: 15px 25px;
        margin: 8px 0;

        &::after {
            opacity: 0.9;
        }
    }

    @media (max-width: 600px) {
        padding: 12px 20px;
        gap: 8px;
        border-bottom-width: 3px;
    }
`;


export const TimeLineTitle = styled.h3`
    font-size: 1.2em;
    font-variation-settings: "wght" 700;
    color: ${(props) => getColorSettings(props.theme).primary}; 
    text-transform: uppercase;
    display: flex;
    align-items: center;
    z-index: 1;
    position: relative;
    line-height: 1.3em;

    & span {
        margin-right: 5px;
        background: linear-gradient(
            135deg, 
            ${(props) => getColorSettings(props.theme).primary}, 
            ${(props) => getColorSettings(props.theme).accentuate}
        );
        background-clip: text;
        font-weight: 800;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {font-size: 1.1em;}

    @media (max-width: 600px) {
        font-size: 1em;
        & span {margin-right: 3px;}
    }
`;


export const TimeLineContent = styled.p`
    line-height: 1.6em;
    z-index: 1;
    position: relative;
    opacity: 0.95;
    
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        font-size: 0.95em;
        line-height: 1.5em;
    }

    @media (max-width: 600px) {font-size: 0.9em;}
`;