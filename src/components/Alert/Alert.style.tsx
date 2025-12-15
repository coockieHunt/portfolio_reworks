import styled from 'styled-components';

import { IAlertContainerProps, IContainerProps } from './Alert.interfaces';

import { fadeIn } from '../../styles/utils.style'
import { getColorSettings } from '../../config';

export const Container = styled.div<IContainerProps>`
    position: absolute;
    position: fixed;
    height: 100vh;
    width: 400px;
    bottom: 5vh;
    right: 0;
    top: 0;
    display: flex;
    gap: 10px;
    justify-content: start;
    z-index: 10000;
    pointer-events: none;
    padding: 10px;

    flex-direction: ${props => props.$direction};

    @media (max-width: 700px) {width: 100%;}
`

export const AlertContainer = styled.div <IAlertContainerProps>`
    background-color: ${props => props.$coloralert};
    box-shadow: 0 0 100px rgba(5, 0, 0, 0.336) inset;
    border-radius: 2px;
    display: flex;
    box-sizing: content-box;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-in;

    color: white;



    & button {
        background-color: ${props => props.$coloralert};
        box-shadow: 0 0 100px rgba(5, 0, 0, 0.336) inset;
        text-align: center;
        width: 20%;
        margin-left: auto;
        overflow: hidden;
        cursor: pointer;

        & svg {font-size: 1.3em; color: white}   
    }

    .content {
        width: 80%;
        & span {
            margin-right: 0;
            margin-left: 0;
            padding: 20px 20px;
            display: block;
            width: 100%;
            background-color: ${props => props.$coloralert};
        }
    }

    .alert-content {
        display: flex;
        flex-direction: column;
    }

    .progress-bar {
        height: 3px;
        width: 100%;
        animation: progressAnimation linear forwards;
        display: ${props => props.$timer_bar};
    }

    @keyframes progressAnimation {
        0% {width: 100%;}
        100% {width: 0;}
    }
`
