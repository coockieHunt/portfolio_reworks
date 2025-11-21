import styled, {keyframes} from 'styled-components';
import {SCREEN_SIZE, getColorSettings, GetLightSetting } from '../../config.jsx';

const breath = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.7; }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;

    width: 85%;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 90%;
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 300px; 
        height: 300px; 
        border-radius: 50%;
        filter: blur(80px); 
        z-index: -1; 
        animation: ${breath} 3s ease-in-out infinite;

    }

    &::before {
        left: -150px;
        background: radial-gradient(circle, ${props => getColorSettings(props.theme).primary} 0%, rgba(147, 112, 219, 0) 70%); 
    }

    &::after {
        right: -150px;
        background: radial-gradient(circle, ${props => getColorSettings(props.theme).secondary} 0%, rgba(0, 255, 255, 0) 90%);
    }

    @media (max-width: 1200px) {padding-bottom: 30px;}
`

export const ProjectCard = styled.div`
    & img{
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;    
    }

    display: flex;
    flex-direction: column;
    padding: 15px;
    cursor: pointer;
    transition: all .6s ease;
    position: relative;
    overflow: hidden;

    border: 1px solid ${props => getColorSettings(props.theme).secondary};

    border-radius: 5px;

    &::before{
        content: "";
        position: absolute;
        inset: 0;
        transform: scale(1.05);
        transform-origin: center;
        background-color: #272727;
        opacity: 0.5;
        filter: blur(100px);
        z-index: -1;
        pointer-events: none;
        opacity: .4;

    }

    & > * { position: relative; z-index: 1; }

    & .title{
        font-size: 1.6em;
        font-variation-settings: "wght" 800;
        padding-bottom: 15px;
        position: relative;
       
        &:before{
            transition: all .6s ease;
            content: "";
            display: block;
            width: 20%;
            height: 4px;
            background: ${props => getColorSettings(props.theme).secondary};
            left: 0;
            bottom: 0;
            position: absolute;
        }
    }


    & p {
        font-size: 1em;
        line-height: 1.3em;
        width: 100%;


        margin-top: 15px;

        max-height: 180px;
        overflow-y: auto;

        padding-right: 5px;
    }


    &:hover
    {
        transform: scale(1.01);
        & .title:before{
            transition: all .6s ease;
            width: 40%;
        }
    }
       

    @media (min-width: ${SCREEN_SIZE.mobile}) {&:hover{transition: all .6s ease;}}
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        margin: 0 auto;
    }

    &.favorite {
         &::before{
            background-color: ${props => getColorSettings(props.theme).secondary};
         }
    }
`
