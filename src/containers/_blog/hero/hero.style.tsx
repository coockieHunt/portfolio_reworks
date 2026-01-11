import styled, { css } from 'styled-components';
import { SCREEN_SIZE } from '@/config';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

interface ContainerProps {
    $backgroundImg?: string;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 400px;

    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

    position: relative;
    z-index: 0;
    overflow: hidden;

    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--primary), transparent 90%),
        color-mix(in srgb, var(--secondary), transparent 90%)
    );

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

                filter: blur(8px);
                transform: scale(1.1);
            }
        `}

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: 250px;
        font-size: 2em;
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
