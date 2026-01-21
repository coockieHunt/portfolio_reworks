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

    position: relative;
    z-index: 0;
    overflow: hidden;
    padding: 4rem 1rem;


    ${({ $backgroundImg }) =>
        $backgroundImg &&
        css`
            &::after {
                content: '';

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                z-index: -1;

                background: url(${$backgroundImg}) no-repeat center center;
                background-size: cover;

                filter: blur(8px) brightness(0.9); 
                transform: scale(1.1);
            }
        `}

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: auto;
        font-size: 1.3rem;
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
        ${HexToRgbaConverter('var(--secondary)', 0.1)} 0%,
        rgba(0, 0, 0, 0) 70%
    );
`;
