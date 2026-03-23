import styled, { css } from 'styled-components';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

export const Tag = styled.span<{ $color: string; $interactive: boolean }>`
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid ${props => props.$color || '#333'};
    color: #fff;
    
    background-color: ${props => HexToRgbaConverter(props.$color, 0.4)};
    
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    cursor: ${props => props.$interactive ? 'pointer' : 'default'};

    ${props => props.$interactive && css`
        &:hover {
            transform: scale(1.05);
            background-color: ${HexToRgbaConverter(props.$color, 0.7)};
        }
    `}

    &.selected {
        box-shadow: 0 0 15px ${props => HexToRgbaConverter(props.$color, 0.7)};
        background-color: ${props => HexToRgbaConverter(props.$color, 1)};
        
        & strong {color: white; }
    }
`;