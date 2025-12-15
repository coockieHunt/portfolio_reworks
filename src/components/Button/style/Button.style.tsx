import styled from 'styled-components';
import { BORDER_RADIUS, getColorSettings } from '../../../config';
import { HexToRgbaConverter } from '../../../utils/HexToRgbaConverter';

interface ButtonContainerProps {
    $colorLine?: string;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center;
    padding: 15px 20px;
    
    background-color: ${props => props.$colorLine ? props.$colorLine : getColorSettings(props.theme).primary};
    color: white;
    border: none;
    border-radius: ${BORDER_RADIUS.small};
    text-transform: uppercase;
    font-variation-settings: "wght" 500;
    font-size: .8em;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.6s ease;

    gap: 15px;

    & .icon {
        display: flex;        
        align-items: center;
        justify-content: center;
    }

    & span {
        color: white; 
    }

    & svg {
        font-size: 16px;
    }

    &:hover {
       transform: translateY(-2px);
    }

    &.disabled {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
        background-color: ${props => HexToRgbaConverter(getColorSettings(props.theme).background_secondary, 0.9)};
    }
`;