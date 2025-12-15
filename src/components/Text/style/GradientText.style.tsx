import styled, { keyframes } from 'styled-components';

export interface IGradientProps {
    $color: string[];
}

const moveGradient = keyframes`
    0% {background-position: 0% center;}
    50% {background-position: 100% center;}
    100% {background-position: 0% center;}
`;

export const Gradient = styled.span<IGradientProps>`
    background: linear-gradient(to right, ${(props) => props.$color.join(', ')});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    font-variation-settings: "wght" 800;

    background-size: 200% 100%;
    animation: ${moveGradient} 4s linear infinite;
`;