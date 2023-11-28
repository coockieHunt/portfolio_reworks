import styled from 'styled-components';
import { COLOR } from '../config/main'

export const ButtonContainer = styled.button`
    display: flex;
    cursor: pointer;
    text-transform: uppercase;
    background-color: ${props => props.colorLine ? props.colorLine : COLOR.primary};
    color: white;
    transition: all 0.6s ease;
    border-radius: 5px;
    font-variation-settings: "wght" 500;
    font-size: .8em;
    white-space: nowrap;
    align-items: center;    


    & .icon{
        height: 100%;
        width: 100%;
        display: block;
        flex: 1;
        border-left: 1px solid #00000021;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    & span{
        width: 100%;
        height: 100%;
        padding: 0 10px;
        color: white;
    }

    & svg{
        font-size: 16px; 
    }

    &:hover{
        color: white;
        background-color:  ${props => props.colorLine ? props.colorLine : COLOR.primary};
        transition: all 0.6s ease;
        box-shadow: inset 0 0 20px .5em #0000005c;

        & span{color: white;}
    }

    &.disabled{
        background-color: #1b171b;
        color: white;
        cursor: not-allowed;
    }
`;