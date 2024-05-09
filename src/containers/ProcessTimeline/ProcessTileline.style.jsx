import styled from 'styled-components';
import { getColorSettings, GetLightSetting } from "../../config";

export const Container = styled.div`
    margin: 0 0 100px 0;
    color: ${(props) => GetLightSetting(props.color).font}; 
`

export const TimeLineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px 0;
    overflow: none;
    
    &::before{
        content: ''; 
        position: absolute;
        background-color: ${(props) => getColorSettings(props.theme).primary};
        width: 3px;
        height: 10%;
        transition: height .5s ease-in-out;
    }

    &.visible::before {
        transition: height .5s ease-in-out;
        height: 97%;
    }

    &::after{
        content: '';
        position: absolute;
        border-left: 3px solid ${(props) => getColorSettings(props.theme).primary};
        border-bottom: 3px solid ${(props) => getColorSettings(props.theme).primary};
        height: 40px;
        width: 40px;
        transform: rotate(-45deg);
        bottom: -50px;
    }

    & div > :after{
        content: ''; 
        height: 10px;
        width: 10px;
        background-color: ${(props) => getColorSettings(props.theme).primary}; 
        border-radius: 50%; 
        position: absolute; 
        top: 50%;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
    }

    & div:hover::after {opacity: 0; }

    & div{
        transition: .3s all ease-in-out;
        background-color: transparent;
    }

    & div:hover{
        background-color: ${(props) => GetLightSetting(props.color).background_secondary}; 
        & > ::after{opacity: 0;}
    }

    & div:nth-child(2n+1) {
        transform: translateX(50%)  scale(1);
        & > ::after{right: 100%; transform: translate(50%, -50%);}
        &:hover{transform: translate(50%)  scale(1.1);}
    }
    & div:nth-child(2n) {
        transform: translateX(-50%) scale(1);
        &:hover{transform: translate(-50%)  scale(1.1);}
        & > ::after{left: 100%; transform: translate(-50%, -50%);}
    }
`;

export const TimeLineItemContainer = styled.div`
    display: flex; 
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    min-height: 100px;
    padding: 15px 40px;
    margin: 5px 0;
    cursor: pointer;
    transition: transform 0.3s; 
    border-radius: 5px;
    width: 45%;
`;

export const TimeLineTitle = styled.h3`
    font-size: 1.2em;
    font-variation-settings: "wght" 700;
    color: ${(props) => getColorSettings(props.theme).primary}; 
    text-transform: uppercase;

    & span{
        font-variation-settings: "wght" 300;
        font-size: 1.2em;
        display: inline-block;
        width: 100%;
    }
`;

export const TimeLineContent = styled.p`
`;