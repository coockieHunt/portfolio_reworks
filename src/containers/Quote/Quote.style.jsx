import styled from 'styled-components';
import { COLOR, getColorSettings } from '../../config.jsx';


export const Quoute = styled.h2`
    color: white;
    text-align: center;
    padding: 50px;
    font-size: 2em;
    font-variation-settings: "wght" 700;
    position: relative;
/* 
    & svg {
        margin: 0 10px;
        color: ${props => getColorSettings(props.theme).accentuate};

        width: 30px;
        height: 30px;
    } */

    /* &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: ${props => getColorSettings(props.theme).background_tertiary}; 
        opacity: 0.8;
    } */

`