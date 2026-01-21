import styled from 'styled-components';
import { motion } from 'framer-motion';

const CUBE_SIZE = 60;
const HALF_SIZE = CUBE_SIZE / 2;

export const FrameCubeScene = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
    position: relative;
    background: transparent;
`;

export const CubeGroup = styled(motion.div)`
    width: 0;
    height: 0;
    transform-style: preserve-3d;
`;

export const CubeUnitWrapper = styled(motion.div)`
    position: absolute;
    width: ${CUBE_SIZE}px;
    height: ${CUBE_SIZE}px;
    top: -${HALF_SIZE}px;
    left: -${HALF_SIZE}px;
    transform-style: preserve-3d;
`;

export const CubeFace = styled.div<{
    $color: string;
    $rotateX: number;
    $rotateY: number;
    $translateZ: number;
}>`
    position: absolute;
    width: ${CUBE_SIZE}px;
    height: ${CUBE_SIZE}px;
    border: 2px solid ${(props) => props.$color};
    background: rgba(0, 0, 0, 0);
    backface-visibility: visible;
    transform: rotateX(${(p) => p.$rotateX}deg) rotateY(${(p) => p.$rotateY}deg)
        translateZ(${(p) => p.$translateZ}px);
    pointer-events: none;
`;

export const SliderOffset = styled.input<{ color?: string }>`
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    outline: none;
    margin-top: 5px;
    opacity: 0.8;
    cursor: grab;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${(props) => props.color || '#4f46e5'};
        cursor: pointer;
        margin-top: -5px;
    }

    &::-webkit-slider-runnable-track {
        height: 4px;
        border-radius: 2px;
    }

    &::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #4f46e5;
        border: 2px solid white;
        cursor: pointer;
    }
`;
