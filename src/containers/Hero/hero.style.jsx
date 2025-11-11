import styled from 'styled-components';
import { SCREEN_SIZE } from '../../config.jsx';

export const Container = styled.div`
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    min-height: 80vh;
    width: 100%;

    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.5) 100%);  
    }

`;
export const TagSlider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media (max-width:  ${SCREEN_SIZE.mobile}) {display: none;}
`

export const LabelWorld = styled.input`
    font-size: .7em;
    font-weight: bold;
    font-variation-settings: "wght" 600;
    padding: 10px 15px;
    background: ${props => props.$backgroundCustom || 'transparent'};
    outline: transparent;
    color: white;


    &::placeholder{opacity: 0.9;}
    &&:hover, &&:focus{ border: 2px solid ${props => props.$borderColorCustom || 'black'};}
`

export const ButtonScroll = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`
export const Top = styled.div`
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 50px;
    width: 70%;
    z-index: 2;
    height: 100%;

    text-align: center;

    @media (max-width:  ${SCREEN_SIZE.mobile}) {
        width: 100%;
        height: 100%;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        text-align: center;

        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;

        padding: 20px;
        border-radius: 10px;
    }

    & h1{
        font-weight: bold;
        display: block;
        font-size: 3vw;
        margin-bottom: 30px;
        font-variation-settings: "wght" 500;
        line-height: 1.2em;

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            font-size: 8vw;
            width: 100%;
            line-height: 1.3em;
        }
   }

   & p{
        font-size: 2em;
        margin-bottom: 1em;
        margin-top: 2px;
        font-variation-settings: "wght" 150;
   }

   .cta{
        display : flex;
        gap: 50px;

        justify-content: center;
   }
`

