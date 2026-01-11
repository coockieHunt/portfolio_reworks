import styled, { keyframes } from "styled-components";

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
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid var(--primary);
    border-radius: 5px;
    font-size: 1rem;
    margin: 20px 0;
    
    background-color: #1e1e1e;
    color: white;

    &:focus {
        outline: none;
        border-color: var(--secondary);
        box-shadow: 0 0 5px var(--secondary);
    }
`;


export const LoadingBar = styled.div<{ $duration?: number }>`
    height: 3px;
    background-color: var(--secondary);
    position: absolute;
    bottom: 21px;
    left: 1px;
    right: 1px;
    border-radius: 0 0 4px 4px;
    z-index: 10;

    opacity: 0; 
    width: 0%;

    animation: ${loadingAnimation} ${(props) => props.$duration}ms linear forwards;
    
    animation-delay: 200ms;
`;