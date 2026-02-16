import styled from "styled-components";
import { SCREEN_SIZE } from '@/config.js';

export const HighContrastWrapper = styled.div`
    .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 30px 0;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            grid-template-columns: 1fr;
            gap: 15px;
        }
    }

    input, textarea {
        background-color: rgba(0, 0, 0, 0.5);
        color: var(--text);
        border: 2px solid var(--border);
        padding: 10px 12px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 1em;
        transition: all 0.3s ease;
        font-family: inherit;

        &:focus {
            outline: 3px solid var(--primary);
            outline-offset: 2px;
            border-color: var(--primary);
            background-color: rgba(0, 0, 0, 0.7);
        }

        &::placeholder {
            color: var(--text-secondary);
            opacity: 0.7;
        }
    }
`;

export const FormDemoSection = styled.div`
    background: #333;
    padding: 20px;
    margin-top: 10px;
    border-radius: 4px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
`;

export const FormDemoInput = styled.input`
    background: black;
    color: #fdfbfb;
    border: 2px solid white;
    padding: 8px;
    font-weight: 600;
    border-radius: 4px;

    &:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
    }
`;

export const FormDemoButton = styled.button`
    background: black;
    color: white;
    border: 2px solid white;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
    }
`;

export const FocusDemoSection = styled.div`
    background: #333;
    padding: 20px;
    border-radius: 4px;
`;

export const FocusDemoButton = styled.button`
    background: black;
    color: white;
    border: 2px solid white;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    outline: 3px solid #ff0000;
    outline-offset: 2px;
    box-shadow: 0 0 10px #ff0000;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;



