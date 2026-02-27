import styled, { keyframes } from "styled-components";
import { BORDER_RADIUS } from "@/config";

const loadingAnimation = keyframes`
    0% {
        width: 0%;
        opacity: 1;
    }
    100% {
        width: 100%;
        opacity: 1;
    }
`;

const fadeInSlideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    animation: ${fadeInSlideUp} 0.4s ease-out;
`;

export const InputContainer = styled.div`
    position: relative; 
    width: 100%;
    display: flex;
`;

export const Input = styled.input`
    display: block; 
    width: 100%;
    padding: 15px; 
    border: 1px solid var(--border-dark);
    border-radius: ${BORDER_RADIUS.small};
    font-size: 1rem;
    background-color: #1e1e1e;
    color: white;
    transition: all 0.3s ease;
    margin: 0; 

    &:focus {
        outline: none;
        border-color: var(--secondary);
        box-shadow: 0 0 10px var(--secondary);
    }
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    
    transform: translateY(-50%);
    height: 100%;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--primary);
    cursor: pointer;
    opacity: 0.5;
    padding: 0; 
    transition: opacity 0.2s, color 0.2s;

    &:hover { 
        opacity: 1; 
        color: var(--secondary);
    }

  
`;

export const LoadingBar = styled.div<{ $duration?: number }>`
    height: 3px;
    background-color: var(--secondary);
    position: absolute;
    bottom: 1px; 
    left: 2px;   
    right: 2px;
    border-radius: 0 0 ${BORDER_RADIUS.small};
    z-index: 10;
    opacity: 0; 
    width: 0%;
    animation: ${loadingAnimation} ${(props) => props.$duration || 1000}ms linear forwards;
    animation-delay: 350ms; 
`;

export const InfoBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    margin-top: 20px;
    min-height: 32px; 
`;

export const StatusText = styled.span`
    font-size: 1rem;
    color: var(--font-subtle, #aaa);
    display: flex;
    align-items: center;
    gap: 6px;

    font-family: 'font_code', monospace !important;

    strong {
        color: var(--secondary); 
        font-weight: bold;
        font-size: 0.95rem;
    }
`;

export const ResetButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1rem;
    color: #ef4444; 
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: 'font_code', monospace !important;
    min-height: 32px;

    &:hover {
        opacity: 1;
        color: #ff6b6b; 
    }
`;