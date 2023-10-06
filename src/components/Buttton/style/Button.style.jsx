import styled from 'styled-components';
import {COLOR} from '../config'

export const ButtonContainer = styled.button`
    display: flex;
    background-color: ${props => props.colorLine ? props.colorLine : COLOR.primary};
    padding: 12px 20px;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
    transition: all 0.6s ease;
    border-radius: 5px;
    font-variation-settings: "wght" 500;
    font-size: .8em;
    white-space: nowrap;

    & svg{
        font-size: 16px; 
    }
   
    .button-content {
        display: flex; 
        align-items: center;
        gap: 5px;
    }

    &:hover{
        color: white;
        background-color:  ${props => props.colorLine ? props.colorLine : COLOR.primary};
        transition: all 0.6s ease;
        box-shadow: inset 0 0 10px .5em #00000040;
    }

    &.disabled{
        background-color: #1b171b;
        color: white;
        cursor: not-allowed;
    }
`;