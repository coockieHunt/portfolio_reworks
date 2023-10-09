import styled from 'styled-components';
import {COLOR} from '../config'

export const  IconContainer = styled.button`
    color: ${props => props.color ? props.color : COLOR.primary};
    background-color: transparent;
    font-size: 1em;
    padding: 5px;
    transition: all .3s ease;
    cursor: pointer;
    
    &:hover{
        background-color: #363636;
        padding: 5px;
        border-radius: 100%;
        transition: all .3s ease;
    }
`