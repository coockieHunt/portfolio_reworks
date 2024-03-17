import styled from 'styled-components';
import { getColorSettings } from '../../../config';

export const OutileButtonContainer = styled.button`
    display: flex;
    cursor: pointer;
    text-transform: uppercase;
    background-color: transparent;
    border: 1px solid ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
    color: white;
    border-radius: 5px;
    font-variation-settings: "wght" 600;
    font-size: .8em;
    white-space: nowrap;
    align-items: center;    

    position: relative;


    & .icon{
        height: 100%;
        width: 100%;
        display: block;
        flex: 1;
        padding: 10px;
        background-color: ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
    }

    & span {
        display: block;
        padding: 0 15px;
        color: ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
        
        &:after{
            transition: width .3s ease-in-out;

            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            z-index: -1;

            background-color: ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
        }
    }

    & svg{
        font-size: 16px; 
        color: white;
    }

    &:hover{
        & span{
            transition: all .3s ease;
            color: white;
            &::after{width: 100%;}
        }
    }

    &.disabled{
        background-color: #1b171b;
        color: white;
        cursor: not-allowed;
    }
`;