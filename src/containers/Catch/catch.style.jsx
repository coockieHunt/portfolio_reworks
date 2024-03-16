import styled from 'styled-components';
import {SCREEN_SIZE, getColorSettings} from '../../config'


export const Section = styled.div``

export const Text = styled.div`
    & h2{
        font-size: 40px;
        padding-bottom: 10px;
    }

    & p{
        font-size: 18px;
        font-variation-settings: "wght" 350;

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
        color: ${props => getColorSettings(props.theme).primary};
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

    & img{
        width: 450px;
        height: auto
    }
`