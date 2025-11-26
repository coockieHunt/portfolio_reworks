import styled, { keyframes } from 'styled-components';

// 1. Apparition du texte et du fond
const fadeIn = keyframes`
    0% { opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { opacity: 0; }
`;

// 2. Panneau du HAUT : Monte à la fin
const slideUp = keyframes`
    0%, 80% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
`;

// 3. Panneau du BAS : Descend à la fin
const slideDown = keyframes`
    0%, 80% { transform: translateY(0); }
    100% { transform: translateY(100%); }
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none; /* Bloque les clics au travers */
`;

export const Content = styled.div`
    z-index: 1000001;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: ${({ $textColor }) => $textColor || 'white'};
    
    /* Le texte fade in puis fade out avant l'ouverture */
    animation: ${fadeIn} ${({ $duration }) => $duration}ms ease-in-out forwards;
`;

const Panel = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: ${({ $color }) => $color};
    z-index: 1000000;
    will-change: transform;
`;

export const TopPanel = styled(Panel)`
    top: 0;
    animation: ${slideUp} ${({ $duration }) => $duration}ms cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;

export const BottomPanel = styled(Panel)`
    bottom: 0;
    animation: ${slideDown} ${({ $duration }) => $duration}ms cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;