import styled, { keyframes } from 'styled-components';
import { SCREEN_SIZE } from '../../../config.jsx';

const fadeIn = keyframes`
    0% { opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { opacity: 0; }
`;

const slideUp = keyframes`
    0%, 80% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
`;

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
    pointer-events: none; 
`;

export const Content = styled.div`
    display: inline-flex;
    justify-content: center;
    z-index: 1000001;
    width: 100%;          
    text-align: left;      
    padding: 0 5%;         
    font-size: 2vw;       
    line-height: 1.1;      
    font-weight: 900;      
    letter-spacing: 2px;   
    color: ${({ $textColor }) => $textColor || 'white'};
    word-break: break-word; 
    position: absolute;
    top: 50%;            
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    @media ( max-width: ${SCREEN_SIZE.mobile}) {font-size: 3.5vw}

    animation: ${fadeIn} ${({ $duration }) => $duration - 300}ms ease-in-out forwards;
`;

const Panel = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 51%; 
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