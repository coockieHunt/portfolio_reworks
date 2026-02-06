import styled, { css } from "styled-components";
import { BORDER_RADIUS } from "@/config"; 
import { HexToRgbaConverter } from "@/utils/HexToRgbaConverter";

const getBorderRadius = (rounded: boolean) => rounded ? BORDER_RADIUS.large : '0px'; 

export const Container = styled.div<{ $rounded?: boolean; $isOpen?: boolean }>`
    border-radius: ${props => getBorderRadius(!!props.$rounded)};
    overflow: hidden; 
    
    border: 1px solid var(--border-subtle);
    box-shadow: 0 4px 6px ${HexToRgbaConverter('var(--border-subtle)', 0.2)};
    
    transition: all 0.3s ease;
    background-color: #0e0e0e;

    &:hover {
        border: 1px solid var(--border-light);
    }

    ${props => props.$isOpen && css`
        border: 1px solid var(--border-light);
    `}
`;

export const DropdownHead = styled.button<{ $isOpen: boolean }>`
    width: 100%;
    background-color: #0e0e0e;
    color: #fff;
    text-align: left;
    padding: 15px;
    border: none;
    outline: none;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1a1a1a;
        
        & svg {
            stroke-width: 2.5px;
        }
    }

    ${props => props.$isOpen && css`
        & svg {
            stroke-width: 2.5px;
        }
    `}

    & svg {
        color: var(--primary);
        transition: transform 0.3s ease;
        transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
    background-color: #121212;
    overflow: hidden;
    
    max-height: ${props => props.$isOpen ? '500px' : '0'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;

    & .inner-content {
        padding: 15px;
        border-top: 1px solid rgba(255,255,255, 0.05);
    }
`;