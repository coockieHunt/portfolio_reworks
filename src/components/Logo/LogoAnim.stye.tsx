import styled, { keyframes, css } from 'styled-components';

interface IStyledAnimatedSvgProps {
    $isVisible: boolean;
}

const ANIMATION_CONFIG = {
    dotsCount: 30,
    staggerDelay: 0.01,
    dotDuration: '0.6s',
    lineDuration: '1.5s',
    lineDelay: '0.5s',
};

const generateStaggeredDelays = (count: number, delayStep: number) => {
    let styles = '';
    for (let i = 1; i <= count; i++) {
        styles += `&:nth-child(${i}) { animation-delay: ${i * delayStep}s; }`;
    }
    return css`
        ${styles}
    `;
};

const popIn = keyframes`
    0% { opacity: 0; transform: scale(0); }
    60% { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
`;

const drawLine = keyframes`
    0% { opacity: 0; stroke-dasharray: 1000; stroke-dashoffset: 1000; }
    100% { opacity: 1; stroke-dasharray: 1000; stroke-dashoffset: 0; }
`;

export const StyledAnimatedSvg = styled.svg<IStyledAnimatedSvgProps>`
    g circle {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;

        animation: ${({ $isVisible }) =>
            $isVisible
                ? css`
                      ${popIn} ${ANIMATION_CONFIG.dotDuration} cubic-bezier(0.34, 1.56, 0.64, 1) forwards
                  `
                : 'none'};

        ${generateStaggeredDelays(
            ANIMATION_CONFIG.dotsCount,
            ANIMATION_CONFIG.staggerDelay,
        )}
    }

    path {
        opacity: 0;
        animation: ${({ $isVisible }) =>
            $isVisible
                ? css`
                      ${drawLine} ${ANIMATION_CONFIG.lineDuration} ease-out forwards
                  `
                : 'none'};
        animation-delay: ${ANIMATION_CONFIG.lineDelay};
    }
`;
