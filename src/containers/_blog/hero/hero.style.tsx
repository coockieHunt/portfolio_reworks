import styled, { css } from 'styled-components';
import { SCREEN_SIZE } from '@/config';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

interface ContainerProps {
    $backgroundImg?: string;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.3; 
    
    position: relative;
    z-index: 0;
    overflow: hidden;
    padding: 6rem 1rem; 
    
    text-align: center; 
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7); 

    ${({ $backgroundImg }) =>
        $backgroundImg &&
        css`
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -2;
                
                background: url(${$backgroundImg}) no-repeat center center;
                background-size: cover;
                filter: blur(8px) brightness(0.6); 
                transform: scale(1.1);
            }
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                
                background: linear-gradient(
                    135deg,
                    rgba(0, 0, 0, 0.5) 0%,
                    rgba(0, 0, 0, 0.3) 100%
                );
            }
        `}

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: auto;
        font-size: 1.5rem; 
        padding: 4rem 1rem;
        line-height: 1.4;
    }
`;

export const ShadowOverlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 50px; 
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        ${HexToRgbaConverter('var(--secondary)', 0.3)} 0%,
        rgba(0, 0, 0, 0) 100%
    );
`;

