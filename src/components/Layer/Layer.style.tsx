import styled from "styled-components";
import { SCREEN_SIZE } from "@/config";

export const LayerContainer = styled.div`
    position: fixed;
    bottom: 1px;
    left: 1px;
    padding: 12px 20px;
    border-radius: 0 8px 0 0;
    pointer-events: auto;
    z-index: 50;
    width: 40%;
    z-index: 49;


    &::after {    
        content: "";

        position: absolute;
        background: linear-gradient(
            to right, 
            color-mix(in srgb, var(--background-color) 95%, transparent), 
            transparent
        );
        z-index: -1;
        inset: 0;
        border-radius: inherit;
        filter: blur(6px);

    }

    &:hover::after {
        background: linear-gradient(
            to right, 
            color-mix(in srgb, var(--background-color) 95%, var(--primary)), 
            transparent
        );
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        font-size: 0.8em;
    }
`;

export const LayerText = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--primary);
    font-size: 1.5em;
    font-weight: 700;

    a {
        text-decoration: underline;
        font-size: 0.7em;
        color: var(--font) !important;
    }

`;

export const LayerBorder = styled.div`
    position: fixed;
    inset: 0;
    border: 1px solid var(--primary);
    pointer-events: none;
    z-index: 50;
`;