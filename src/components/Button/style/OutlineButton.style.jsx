import styled from 'styled-components';
import {COLOR} from '../config/main'
import { getColorSettings } from '../../../config';

export const OutileButtonContainer = styled.button`
    display: flex;
    border: 1px solid;
    background-color: transparent;
    padding: 5px 10px;
    cursor: pointer;

    border-color: ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
    color: ${props => props.colorLine ? props.colorLine :  getColorSettings(props.theme).primary};
    transition: all 0.6s ease;
    border-radius: 1px;
    font-weight: bold;

    & svg{font-size: 16px; }
    .button-content {
        display: flex; 
        align-items: center; 
        gap: 5px;
    }
    &:hover{
        color: white;
        background-color:  ${props => props.colorLine ? props.colorLine : getColorSettings(props.theme).primary};
        transition: all 0.6s ease;

        &.disabled{
            background-color: #3f393b;
            color: white;
        }
    }

    &.disabled{
        border-color: #3f393b;
        color: #3f393b;
        cursor: not-allowed;
    }
`;