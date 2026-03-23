import styled, { keyframes } from 'styled-components';
import { IAlertContainerProps, IContainerProps } from './Alert.interfaces';

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const progressAnimation = keyframes`
    from { width: 100%; }
    to { width: 0%; }
`;

export const Container = styled.div<IContainerProps>`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    width: auto;
    min-width: 350px;
    max-width: 90vw;
    
    z-index: 10000;
    pointer-events: none;
    
    @media (max-width: 700px) {
        width: 100%;
        padding: 0 15px;
    }
`;


export const AlertContainer = styled.div<IAlertContainerProps>`
    pointer-events: auto;
    position: relative;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    
    background-color: #1e1e1e; 
    
    border-left: 4px solid ${(props) => props.$coloralert};
    
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    
    color: #fff;
    font-family: inherit;
    font-size: 0.95rem;

    animation: ${slideIn} 0.3s ease-out;

    .content {
        flex: 1;
        padding: 15px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        span {
            display: block;
            width: 100%;
            line-height: 1.4;
        }
    }

    & button {
        background: transparent;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
        width: 50px;
        min-width: 50px;
        margin: 0;
        padding: 0;
        
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s;

        & svg {
            font-size: 1.2em;
            color: #888;
            transition: color 0.2s;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.05);
            & svg {
                color: var(--primary);
            }
        }
    }

    .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        
        background-color: var(--primary);
        box-shadow: 0 0 8px var(--primary);
        
        animation: ${progressAnimation} linear forwards;
        display: ${(props) => props.$timer_bar || 'block'};
        transform-origin: left;
        z-index: 2;
    }
`;