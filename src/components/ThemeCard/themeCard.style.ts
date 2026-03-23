import styled, { keyframes } from "styled-components";
import { BORDER_RADIUS } from "@/config";


interface ItemProps {
    $pos?: { x: number; y: number };
    $size?: { width: number; height: number };
    $fill?: string;
    $stroke?: string;
}

const pulse = (color: string) => keyframes`
    0% {
        box-shadow: -4px -4px 15px ${color}60, 0 0 0 0 ${color}80;
    }
    50% {
        box-shadow: -4px -4px 25px ${color}90, 0 0 15px 5px ${color}30;
    }
    100% {
        box-shadow: -4px -4px 15px ${color}60, 0 0 0 0 ${color}00;
    }
`;

export const Item = styled.div.attrs<ItemProps>((props) => ({
    style: {
        left: `${props.$pos?.x || 0}px`,
        top: `${props.$pos?.y || 0}px`,
        width: `${props.$size?.width || 0}px`,
        height: `${props.$size?.height || 0}px`,
        backgroundColor: props.$fill,
        borderColor: props.$stroke,
    },
}))<ItemProps>`
    position: absolute; 
    border: 1px solid;
    box-sizing: border-box;
    border-radius: ${BORDER_RADIUS.small};
`;

export const Container = styled.div<{ $isActive?: boolean, $pulseColor: string }>`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 260px;
    width: 260px;
    border-radius: ${BORDER_RADIUS.small};
    overflow: hidden;
    border: 1px solid #333;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    ${(props) => props.$isActive && `
        border: 2px dashed var(--border-dark);

        & .frame {
            opacity: 1;
            height: 85%;
            width: 85%;
        }
    `}

    &:hover {
        border-color: ${props => props.$pulseColor};
        box-shadow: 0 0 20px ${props => props.$pulseColor}40;

        & .frame {
            animation: ${props => pulse(props.$pulseColor)} 2s infinite;
            height: 85%;
            width: 85%;

            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 86px;
        display: block;
        border-radius: ${BORDER_RADIUS.medium};
        border-color: var(--border-dark);

        &:hover {
            transform: none;
            box-shadow: none;

            & .frame {
                animation: none;
            }
        }
    }
`;

export const Wrapper = styled.div`
    background-color: #0d0d0d;
    flex: 1; 
    position: relative; 

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;

export const Frame = styled.div<{ $bg: string; $shadow: string }>`
    position: absolute;
    right: -10px; 
    bottom: -10px;
    height: 80%;
    width: 80%;
    background-color: ${props => props.$bg};
    border-radius: ${BORDER_RADIUS.large} 0 0 0;
    box-shadow: -4px -4px 15px ${props => props.$shadow};
    overflow: hidden;

    opacity: 0.65;

    transition: height 0.3s ease, width 0.3s ease, opacity 0.3s ease;

    @media (max-width: 768px) {
        right: -4px;
        bottom: -4px;
        height: 84%;
        width: 84%;
        border-radius: ${BORDER_RADIUS.medium} 0 0 0;
        opacity: 0.95;
    }
    
`;

export const Footer = styled.div`
    background-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    width: auto;
    min-width: 0;
    max-width: calc(100% - 16px);
    z-index: 3;
    position: absolute;
    right: 8px;
    bottom: 8px;
    border: 1px solid var(--border-subtle);
    border-radius: ${BORDER_RADIUS.small};
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        background-color: color-mix(in srgb, #1e1e1e, white 8%);
    }

    & svg{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 3px;
        border-radius: ${BORDER_RADIUS.small};
    }
    span {
        color: white;
        font-size: 1.02rem;
        line-height: 1;
        font-weight: 500;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8px;
    }

    @media (max-width: 768px) {
        padding: 6px 10px;

        span {
            font-size: 0.95rem;
            margin-right: 6px;
        }

        & svg {
            opacity: 0.9;
        }
    }
`;