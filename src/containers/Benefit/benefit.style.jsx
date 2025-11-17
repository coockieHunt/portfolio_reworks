import styled, { keyframes } from 'styled-components';
import { getColorSettings, GetLightSetting, SCREEN_SIZE } from '../../config.jsx';

const AuraBreath = keyframes`
    0% { 
        background-size: 30% 30%;
        opacity: 0.3;
    }
    
    50% { 
        background-size: 100% 100%; 
        opacity: 0.8;
    }
`;


export const Container = styled.div`
    padding: 20px 30px;
    height: auto;
    @media (max-width: 1200px) {padding: 0 20px;}
`;

export const Text = styled.span`
    font-size: 1.2em;
    margin-bottom: 50px;
    text-align: center;
    width: 100%;
    display: inline-block;
    color: ${props => GetLightSetting(props.light).font};

    padding: 0 25px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
    width: 90%;
    padding: 30px 0;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        height: 10%;
        text-align: center;
        justify-content: space-between;
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;

    @media (max-width: 1200px) {line-height: 2em;}
`;

export const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    & .InfoElement {
        &:hover {transform: scale(1.02);}}

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        gap: 40px;

        & .InfoElement {           
            border-bottom: 1px solid #ffffff32;
            padding-bottom: 30px;
        }
    }

    & .title{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 10px;

        & svg {
            font-size: 1.6em;
            height: auto;
            width: 35px;
            border: 2px solid ${props => getColorSettings(props.theme).primary};
            padding: 8px;
            border-radius: 8px;
            position: relative;
        }
    }

    & h3 {
        font-size: 1.2em;
        line-height: 2em;
        text-transform: uppercase;
        font-variation-settings: "wght" 500;
        color: ${props => getColorSettings(props.theme).primary};
        position: relative;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            font-size: 1em;
        }
    }

    & p {
        font-variation-settings: "wght" 350;
        font-size: 1em;
        line-height: 1.6em;
    }

    &.start {
        text-align: end;
        & .title {justify-content: flex-end;}

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            margin-bottom: 40px;
            text-align: left;
            & .title {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    }

    &.end {
        text-align: start;
        & .title {justify-content: flex-start;}

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            text-align: left;
            & .title {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    }
`;

export const Img = styled.div`
    flex: 0 0 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; 
    &::after {
        animation: ${AuraBreath} 4s ease-in-out infinite alternate;
        
        content: '';
        position: absolute;
        top: 10px;
        left: 40px;
        width: 90%;
        height: 90%; 
        
        background: radial-gradient(
            circle,
            ${props => getColorSettings(props.theme).primary} 10%, 
            transparent 60% 
        );

        filter: blur(30px);
        background-repeat: no-repeat;
        background-position: center;
        
        opacity: 0.5; 
        z-index: -1;
    }
    & svg {
        padding: 10px;
        width: 60%;
        height: auto;
        color: ${props => getColorSettings(props.theme).primary};
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {display: none;}
`;