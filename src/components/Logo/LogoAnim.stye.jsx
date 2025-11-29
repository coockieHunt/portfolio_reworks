import styled, { keyframes, css } from 'styled-components';

// Function to generate nth-child rules for animation delays
const generateRulsDelays = (count, delay) => {
    let styles = '';
    for (let i = 1; i <= count; i++) {styles += `&:nth-child(${i}) { animation-delay: ${i * delay}s; }`;}
    return css`${styles}`;
};

//animation dots
const popIn = keyframes`
    0% { opacity: 0; transform: scale(0); }
    60% { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
`;

//animation path
const drawLine = keyframes`
    0% { opacity: 0; stroke-dasharray: 1000; stroke-dashoffset: 1000; }
    100% { opacity: 1; stroke-dasharray: 1000; stroke-dashoffset: 0; }
`;

export const StyledAnimatedSvg = styled.svg`
    g circle {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;

        animation: ${props => props.$isVisible ? css`${popIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` : 'none'};
        ${generateRulsDelays(30, 0.04)}
    }

    path {
        opacity: 0;
        animation: ${props => props.$isVisible ? css`${drawLine} 1.5s ease-out forwards`: 'none'};
        animation-delay: 1.2s;
    }
`;