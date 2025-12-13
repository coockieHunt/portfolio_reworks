import styled from "styled-components";
import { motion } from "framer-motion";
import { SCREEN_SIZE } from "../../config.js"; 

const CUBE_SIZE = 60;
const HALF_SIZE = CUBE_SIZE / 2; 

export const FrameCubeScene = styled.div`
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
    overflow: hidden;
    position: relative;
    background: transparent;
`;

export const FrameCubeContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: monospace;
    z-index: 9;
    display: flex;          
    gap: 15px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);

    & button {
        pointer-events: auto; 
        cursor: pointer; 
        background: transparent; 
        border: none; 
        color: white; 
        margin-top: -2px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {display: none;}

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

export const CubeFace = styled.div<{ $color: string; $rotateX: number; $rotateY: number; $translateZ: number }>`
    position: absolute;
    width: ${CUBE_SIZE}px;
    height: ${CUBE_SIZE}px;
    border: 2px solid ${props => props.$color};
    background: rgba(0,0,0,0);
    backface-visibility: visible;
    transform: rotateX(${p => p.$rotateX}deg) rotateY(${p => p.$rotateY}deg) translateZ(${p => p.$translateZ}px);
    pointer-events: none;
`;