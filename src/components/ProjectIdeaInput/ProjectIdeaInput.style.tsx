import styled, { keyframes } from 'styled-components';
import {
    ShowOutContainerRight,
    BorderPulseLight,
} from '../../styles/utils.style';

const PlaceholderBlink = keyframes`
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
`;

export const Container = styled.div`
    display: flex;
`;

export const SendIcon = styled.div`
    position: absolute;
    right: 1px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 0.6em;
    cursor: pointer;
    pointer-events: auto;
    z-index: 10;
    padding: 10px;
    padding-left: 4px;
    border-radius: 2px;
    transition:
        transform 0.2s ease,
        color 0.2s ease;
    animation: ${ShowOutContainerRight} 0.3s ease-out;

    &:hover {
        transform: translateY(-50%) scale(1.15);
        color: var(--accentuate);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const LabelWorld = styled.input`
    font-size: 0.8em;
    padding: 3px 10px;
    padding-right: 50px;
    background: #1f1e1e;
    border: 2px solid #ffffff21;
    outline: transparent;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    will-change: border-color;
    font-variation-settings: 'wght' 600;

    &:not(:focus, :hover) {
        border-bottom: 2px solid #ffffff21;
        animation: ${BorderPulseLight} 2s infinite;
    }

    &::placeholder {
        opacity: 1;
        color: var(--font-hint);
        transition: color 0.3s ease;
        animation: ${PlaceholderBlink} 2s infinite ease-in-out;
    }

    &&:hover,
    &&:focus {
        border: 2px solid var(--primary);
    }
`;
