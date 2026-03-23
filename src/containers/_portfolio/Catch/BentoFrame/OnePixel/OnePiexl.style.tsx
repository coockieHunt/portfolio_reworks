import styled, { keyframes } from 'styled-components';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { BentoFrameComponent } from '@/components/Bento/Bento.component';
import { motion } from 'framer-motion';

const glitchBlink = keyframes`
    0% { border-color: transparent; }
    30% { border-color: ${HexToRgbaConverter('var(--error)', 0.4)}; }
    50% { border-color: ${HexToRgbaConverter('var(--error)', 0.4)}; } 
    70% { border-color: ${HexToRgbaConverter('var(--error)', 0.4)}; } 
    100% { border-color: transparent; }
`;

export const OnePixel = styled(BentoFrameComponent)`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 320px;

    & .gridsWrapper {
        display: flex;
        gap: 5%;
        width: 80%;
        justify-content: center;
    }

    & .pixelGrid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4px;
        flex: 1;
        aspect-ratio: 1/1;
    }

    & .frame {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image:
            linear-gradient(to right, color-mix(in srgb, var(--primary), transparent 92%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--primary), transparent 92%) 1px, transparent 1px);
        background-size: 16px 16px;
        background-position: center;

        & span {
            font-size: 0.7em;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
    }
`;

export const Pixel = styled(motion.div)`
    border-radius: 1px;
    width: 100%;
    height: 100%;
    
    background: ${HexToRgbaConverter('var(--primary)', 0.1)};

    &.stable{
        background-color: var(--primary);
    }

    &.glitched {
        cursor: pointer;
        z-index: 2;
        background-color: transparent;
        background-color: ${HexToRgbaConverter('var(--primary)', 0.6)};
        backdrop-filter: opacity(1%);
        animation: ${glitchBlink} 1s infinite;

        border: 1px solid transparent;
        &:hover {
            transform: scale(1.3);
            background-color: var(--secondary);
        }
    }

`;