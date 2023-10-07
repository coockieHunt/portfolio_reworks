import styled from 'styled-components';
import { SCREEN_SIZE } from '../../config';

export const Container = styled.div`
    height: 95vh;

  
`

export const DeskSpline = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
`

export const HeroText = styled.div`
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    left: 100px;
    width: 50%;
    z-index: 2;

    @media (max-width:  ${SCREEN_SIZE.mobile}) {
        width: 80%;
        left: 50%;
        top: 25%;
        transform: translateX(-50%);
        text-align: center;
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
            justify-content: space-between;
        }
   }
`

