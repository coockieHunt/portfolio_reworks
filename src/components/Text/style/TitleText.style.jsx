import styled from 'styled-components';
import { STYLE } from '../config/main';

export const TitleContainer = styled.div`
    position: relative;
    height: 100px;
    width: 100vw;
    padding: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space:nowrap;

    left: 50%;
    transform: translate(-50%, 0);
    overflow: hidden;
`

export const Title = styled.h2`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;

    display: inline-block;
    z-index: 9;
    font-variation-settings: "wght" 500;
    color:${STYLE.primary};
    font-size: 5vh ;
    text-transform: uppercase;

    @media screen and (max-width: 768px) {
        font-size: 4vh; 
    }
`

export const BackTitle = styled.span`
    display: inline-block;
    z-index: 2;
    width: 100%;

    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;

    font-variation-settings: "wght" 700;
    font-size: 9vh;
    color: #000000f8;
    text-transform: uppercase;

    @media screen and (max-width: 768px) {
        font-size: 7vh; 
    }
`