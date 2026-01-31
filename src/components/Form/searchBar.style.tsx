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

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const InputContainer = styled.div`
    position: relative; 
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 15px; 
    border: 1px solid var(--primary);
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

export const LoadingBar = styled.div<{ $duration?: number }>`
    height: 3px;
    background-color: var(--secondary);
    
    position: absolute;
    bottom: 1px; 
    left: 2px;   
    right: 2px;
    
    border-radius: 0 0 ${BORDER_RADIUS.small} ; 
    z-index: 10;
    opacity: 0; 
    width: 0%;

    animation: ${loadingAnimation} ${(props) => props.$duration || 1000}ms linear forwards;
    animation-delay: 350ms; 
`;

export const InfoBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between; 
    align-items: center;
    margin-top: 8px;
    padding: 0 2px;
    min-height: 24px; 
`;

export const StatusText = styled.span`
    font-size: 0.85rem;
    color: var(--font-subtle, #aaa);
    display: flex;
    align-items: center;
    gap: 6px;

    strong {
        color: var(--secondary); 
        font-weight: bold;
        font-size: 0.95rem;
    }
`;

export const ResetButton = styled.button`
    background: transparent;
    border: none;
    font-size: 0.75rem;
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

    &:hover {
        opacity: 1;
        color: #ff6b6b; 
    }
`;