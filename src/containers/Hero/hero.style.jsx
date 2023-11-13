import styled from 'styled-components';

import { SCREEN_SIZE } from '../../config';

export const Container = styled.div`
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`
export const TagSlider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media (max-width:  ${SCREEN_SIZE.mobile}) {display: none;}
`

export const Botton = styled.div`
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
    width: 55%;
    z-index: 2;
    height: 100%;

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
        font-size: 5vw;
        margin-bottom: 30px;
        font-variation-settings: "wght" 500;
        line-height: 0.95em;

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            font-size: 10vw;
            width: 100%;
            line-height: 1em;
        }
   }

   & p{
        font-size: 2em;
        margin-bottom: 1em;
        margin-top: 2px;
   }

   .cta{
        display : flex;
        gap: 10px;

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            justify-content: space-around;
        }
   }
`

