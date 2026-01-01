import styled from 'styled-components';
import { BORDER_RADIUS } from '../../../config';


interface ButtonContainerProps {
    $colorLine?: string;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center;
    
    background-color: ${props => props.$colorLine ? props.$colorLine : 'var(--primary)'};
    border: none;
    border-radius: ${BORDER_RADIUS.small};
    text-transform: uppercase;
    font-variation-settings: "wght" 500;
    font-size: .8em;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.6s ease;

    color: var(--font-on-primary);

    gap: 15px;

    & .icon {
        display: flex;        
        align-items: center;
        justify-content: center;
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
        background-color: color-mix(in srgb, var(--background-secondary), transparent 10%);
    }
`;