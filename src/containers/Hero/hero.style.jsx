import styled from 'styled-components';
import { SCREEN_SIZE, COLOR } from '../../config';

export const Container = styled.div`
    height: 800px;
`
export const DeskSpline = styled.div`
    position: relative;
    top: -800px;
    z-index: 1;

    height: 100%;


    & .loading {
        position: absolute;
        top: 40%;
        right: 20%;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            top: 45%;
            right: 35%;
        }
    }
`

export const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 50px;
    width: 60%;
    height: 100%;
    z-index: 2;

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

        background-color: #20202099;
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

