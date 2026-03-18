import styled from 'styled-components';
import { BORDER_RADIUS } from '@/config';

export const FenceContainer = styled.div`
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px 19px;
    position: relative;

    & .desktop-contact-card { display: block; }

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        justify-content: flex-start;
        padding: 30px 20px;
        gap: 20px;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        &::-webkit-scrollbar { display: none; }
        & .desktop-contact-card { display: none; }
    }
`;

export const ScrollIndicator = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
        position: relative;
        margin: 0 auto;
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--primary) 80%, transparent 100%);
        border-radius: 2px;
        opacity: 0.6;
        animation: scrollHint 2s ease-in-out infinite;
        @keyframes scrollHint {
            0%, 100% { transform: translateX(-10px); opacity: 0.6; }
            50% { transform: translateX(10px); opacity: 1; }
        }
    }
`;

export const IconList = styled.span` 
    & > svg { 
        color: var(--primary); height: 100%; 
    } 
`;
export const CatchModal = styled.span` 
    display: block; 
    margin: 0 auto; 
    text-align: center; 
    font-size: 1rem; 
    font-variation-settings: 'wght' 200; 
`;
export const ListModal = styled.ul` 
    list-style: none; 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
    padding-top: 30px; 
    & > li { 
        display: flex; 
        align-items: center; 
        gap: 10px; 
        font-variation-settings: 'wght' 300; 
    } 
`;

export const Fence = styled.div`
    cursor: pointer;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    border-radius: ${BORDER_RADIUS.xlarge};
    border: 2px solid var(--border-dark);
    position: relative;
    padding: 20px;
    gap: 5px;
    min-height: 200px;
    min-width: 200px;
    overflow: hidden;

    isolation: isolate;
    background-color: #0c0c0c; 

    & .catch {
        font-family: "Source Code Pro", monospace;
        font-variation-settings: 'wght' 400;
        font-size: 1.3rem; 
        margin-bottom: 10px;
    }

    & span {
        color: var(--primary);
        transition: all 0.3s ease-in-out;
        display: inline-flex; 
        align-items: center; 
        gap: 8px; 
        font-variation-settings: 'wght' 500;
        & .arrow-icon {
            width: 20px; 
            height: 20px; 
            transition: transform 0.3s ease; 
        }
    }

    &::after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background-color: color-mix(in srgb, var(--primary), transparent 97%);
        z-index: -1;
    }

    & > svg { 
        color: var(--primary); 
        font-size: 2em; 
        margin-bottom: 10px; 
    }

    &:hover {
        border-color: var(--border-light);
        & span{
            font-variation-settings: 'wght' 600;
            & .arrow-icon { transform: translateX(6px); }
        }

    }

    @media (max-width: 768px) {
        min-width: 280px; max-width: 280px; flex-shrink: 0; scroll-snap-align: center;
    }

    &.HightLighting {
        box-shadow: 0 0 30px color-mix(in srgb, var(--primary), transparent 40%);
    }
`;