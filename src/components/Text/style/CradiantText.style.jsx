import styled, { keyframes } from 'styled-components';
import { COLOR } from '../config';

const moveGradient = keyframes`
   to {
      background-position: 200% center;
    }
`;

export const Gradient = styled.span`
    background: linear-gradient(to right, ${COLOR.primary} 20%, ${COLOR.secondary_gradiant} 40%, ${COLOR.secondary_gradiant} 60%, ${COLOR.primary} 80%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% 100%;
    animation: ${moveGradient} 2s linear infinite;

    font-variation-settings: "wght" 800;
`;
