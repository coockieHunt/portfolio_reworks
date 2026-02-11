import styled from "styled-components";
import { SCREEN_SIZE } from '@/config.js';

export const HighContrastWrapper = styled.div`
    .container {
        margin: 20px auto 0;
        padding: 60px 100px;
        color: var(--text);
        line-height: 1.6;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            padding: 40px 16px;
            margin: 20px auto 0;
        }
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: var(--primary);
        border-bottom: 3px solid var(--primary);
        padding-bottom: 15px;
        
        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.75rem;
            margin-bottom: 15px;
            padding-bottom: 12px;
        }
    }

    h2 {
        font-size: 2rem;
        font-weight: 600;
        margin-top: 40px;
        margin-bottom: 20px;
        color: var(--primary);
        border-left: 4px solid var(--primary);
        padding-left: 15px;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.5rem;
            margin-top: 30px;
            margin-bottom: 15px;
        }
    }

    h3 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 30px;
        margin-bottom: 15px;
        color: var(--text);

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.1rem;
        }
    }

    p {
        margin-bottom: 15px;
        font-size: 1.02em;
        line-height: 1.7;

        code {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: var(--accent);
            font-weight: 500;
        }
    }

    section {
        margin-bottom: 40px;
        padding: 25px;
        border: 2px solid var(--border);
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.02);

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            padding: 18px;
            margin-bottom: 30px;
        }
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 15px;

        li {
            margin-bottom: 12px;
            padding-left: 25px;
            position: relative;
            line-height: 1.7;

            &:before {
                content: "▸";
                position: absolute;
                left: 0;
                color: var(--primary);
                font-weight: bold;
                font-size: 1.2em;
            }

            strong {
                color: var(--primary);
                font-weight: 600;
            }
        }
    }

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

    .swatch {
        display: flex;
        flex-direction: column;
        border: 2px solid var(--border);
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;

        &:hover {
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }
    }

    .swatch-color {
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.1em;
        border-bottom: 1px solid var(--border);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .swatch-info {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        strong {
            color: var(--primary);
            font-weight: 600;
            font-size: 1.05em;
        }

        small {
            color: var(--text-secondary);
            font-size: 0.9em;
            line-height: 1.4;
        }
    }

    .swatch-hex {
        font-family: 'Courier New', monospace;
        color: var(--accent);
        font-weight: 500;
        font-size: 0.95em;
    }

    .sample-box {
        background-color: rgba(0, 0, 0, 0.3);
        border: 2px solid var(--border);
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        font-weight: 500;
        line-height: 1.6;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            padding: 15px;
            margin: 15px 0;
        }

        strong {
            color: var(--primary);
            font-weight: 600;
        }
    }

    input[type="text"],
    textarea,
    input[type="email"],
    input[type="password"],
    input[type="search"] {
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

    button {
        background-color: rgba(0, 0, 0, 0.5);
        color: var(--text);
        border: 2px solid var(--border);
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: inherit;

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: var(--primary);
        }

        &:focus {
            outline: 3px solid var(--primary);
            outline-offset: 2px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        &:active {
            transform: scale(0.98);
        }
    }

    a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;

        &:hover {
            text-decoration: underline;
        }

        &:focus {
            outline: 2px solid var(--primary);
            outline-offset: 4px;
            border-radius: 2px;
        }
    }
`;

export const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const HeaderTitle = styled.h1`
    margin: 0;
`;

export const ButtonSection = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export const StatusText = styled.span`
    font-size: 0.9rem;
    opacity: 0.8;

    strong {
        font-weight: 600;
    }
`;

export const SwatchColorDemo = styled.div<{ $bgColor: string; $textColor: string }>`
    background-color: ${props => props.$bgColor};
    color: ${props => props.$textColor};
    border: ${props => props.$bgColor === '#000' && props.$textColor === '#ff0000' ? '3px solid #ff0000' : '1px solid #ccc'};
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1em;
    border-bottom: 1px solid var(--border);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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



