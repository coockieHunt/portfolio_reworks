import styled from 'styled-components';
import { COLOR } from '../../config';
import {SCREEN_SIZE} from '../../config'

export const Container = styled.div`
    height: 100%;
    width: 100%;

    overflow: hidden;
`

export const Text = styled.div`

    padding: 60px;

    & h2{
        font-size: 40px;
        padding-bottom: 10px;
    }

    & p{
        font-size: 18px;
        font-weight: lighter;
    }

    & ul{
        list-style-type: none;
        padding-left: 0;
    }

    & ul li{
        font-size: 22px;
        font-weight: lighter;
        margin-top: 20px;
        font-variation-settings: "wght" 400;
    }

    & ul li::before {
        content: "#";
        color: ${COLOR.primary};
        margin-right: 10px;
        font-variation-settings: "wght" 700;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 20px;
    }
`


export const HomeSheetContainer = styled.div`
    display: flex;

    align-items: center;
    justify-content: center;
`