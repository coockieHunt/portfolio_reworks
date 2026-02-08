import styled from 'styled-components';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE } from '@/config.js';

export const MarkdownContent = styled.div`
    margin-top: 20px;
    line-height: 1.8; 
    
    & h1, & h2, & h3, & h4, & h5, & h6 {
        font-family: "Source Code Pro", monospace;
        scroll-margin-top: 80px; 
        color: var(--primary);
    }

    & h1, & h2 {
        font-family: "Doto Variable", serif;

    }
    
    & h1 {
        font-weight: 600; 
        font-size: 2.1rem; 
        margin: 50px 0 25px 0;
        line-height: 1.2;
        border-bottom: 1px solid var(--border-dark); 
        padding-bottom: 15px;
        letter-spacing: -1px; 
        font-variation-settings: "wght" 700, "ROUND" 100;
        
        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.75rem;
            margin: 35px 0 20px 0;
        }
    }

    & h2 {
        font-weight: 600;
        font-size: 1.9rem; 
        margin: 45px 0 20px 0; 
        line-height: 1.3;
        letter-spacing: -0.5px;

        font-variation-settings: "wght" 600, "ROUND" 100;

        & svg {
            color: var(--primary);
            opacity: 0.4;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                opacity: 1;
                transform: scale(1.1);
            }
        }

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.5rem;
            margin: 35px 0 15px 0;
        }
    }

    & h3 {
        font-weight: 400; 
        font-size: 1.5rem; 
        margin: 35px 0 15px 0;
        line-height: 1.4;
        color: var(--primary);
        
        @media (max-width: ${SCREEN_SIZE.tablet}) {
            font-size: 1.25rem;
        }
    }

    & h4 {
        font-weight: 500;
        font-size: 1.2rem;
        margin: 30px 0 12px 0;
        line-height: 1.4;
        color: var(--secondary);
    }

    & h5 {
        font-weight: 600;
        font-size: 1.05rem;
        margin: 25px 0 10px 0; 
        line-height: 1.5;
        color: var(--secondary);
    }

    & h6 {
        font-weight: 600;
        font-size: 0.9rem;
        margin: 25px 0 10px 0;
        line-height: 1.5;
        color: var(--font-subtle); 
        text-transform: uppercase;
    }

    & p {
        line-height: 1.8; 
        margin-bottom: 24px;
        color: var(--font-primary);
        font-size: 1rem;
        
        h1 + &, h2 + &, h3 + &, h4 + &, h5 + &, h6 + & {
            margin-top: 8px;
        }
    }

    & details {
        margin: 20px 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.50)}, #000000 90%);
        
        & summary {
            cursor: pointer;
            font-weight: 600;
            color: var(--primary);
            background-color: red;
            outline: none;
            padding: 10px 15px;
            background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.90)}, #000000 90%);
        }

        & p {
            margin-top: 10px;
            padding: 10px 15px;
        }
    }



    & strong {
        font-weight: 600;
        color: var(--font-primary);
    }

    & em {
        font-style: italic;
        color: var(--font-subtle);
    }

    & del {
        text-decoration: line-through;
        opacity: 0.6;
        color: var(--font-hint);
    }

    & code:not(pre code) {
        border-radius: 4px;
        padding: 4px 8px; 
        font-size: 0.9em;
        font-family: 'Courier New', Courier, monospace;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05); 
    }

    & pre {
        display: flex;
        flex-direction: column; 
        position: relative;
        margin: 30px 0;
        border-radius: 10px;
        overflow: hidden;  
        font-family: 'Courier New', Courier, monospace;
        z-index: 1;
        font-size: 0.95rem;

        background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.50)}, #000000 85%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

        & .info {
            display: flex;
            align-items: center;
            justify-content: space-between; 
            width: 100%;
            padding: 10px 18px;
            background-color: rgba(0, 0, 0, 0.4); 
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.85rem;
            color: var(--font-subtle);
            user-select: none;
            font-weight: 500;

            & span, & .copy {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            & .copy {
                cursor: pointer;

                &:hover { 
                    color: var(--primary);
                    transform: scale(1.1);
                    transition: all 0.2s ease;
                }
            }
        }

        & code {
            overflow-x: auto; 
            width: 100%;
            padding: 20px; 
            line-height: 1.6;
            background: transparent; 

            &::-webkit-scrollbar {
                height: 8px;
            }
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 4px;
            }
            &::-webkit-scrollbar-thumb {
                background: ${HexToRgbaConverter('var(--primary)', 0.3)};
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                    background: ${HexToRgbaConverter('var(--primary)', 0.5)};
                }
            }
        }
    }

    & code {
        position: relative;
        z-index: 2;
        border: none;
        font-family: inherit;
        padding: 10px;
    }
    
    .mjx-math,
        .katex {
        font-size: 1.4em;
        color: #222;
        }

        .mjx-math {
        font-family: "Times New Roman", serif;
        }

        .katex-display {
        margin: 1.2em 0;
        }
    & ul {
        margin: 25px 0; 
        padding-left: 30px;
        list-style-type: none;

        & li {
            position: relative;
            margin-bottom: 10px; 
            line-height: 1.8;
            padding-left: 10px;

            &::before {
                content: "▸";
                color: var(--primary);
                position: absolute;
                left: -20px;
                font-weight: bold;
            }
        }

        & ul {
            margin: 10px 0;
            & li::before { content: "◦"; }
            & ul {
                & li::before { content: "▪"; }
            }
        }
    }

    & ol {
        margin: 25px 0;
        padding-left: 30px;
        list-style-type: decimal;

        & li {
            margin-bottom: 10px;
            line-height: 1.8;
            padding-left: 10px;

            &::marker {
                color: var(--primary);
                font-weight: 700;
            }
        }

        & ol {
            margin: 10px 0; 
            list-style-type: lower-alpha;
            & ol { list-style-type: lower-roman; }
        }
    }

    & input[type='checkbox'] {
        margin-right: 12px;
        cursor: pointer;
        accent-color: var(--primary);
        width: 16px;
        height: 16px;
        position: relative;
        top: 2px;
    }

    & blockquote {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 3px solid var(--primary); 
        padding: 20px 25px; 
        margin: 30px 0; 
        background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.70)}, #000000 92%);
        font-style: italic;
        color: var(--font-subtle);
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        &.type-WARNING { 
            border-left: 3px solid yellow;
            & .type-title { color: yellow;}
        }
        &.type-TIP { 
            border-left: 3px solid blue;
            & .type-title { color: blue;}
        }
        &.type-NOTE { 
            border-left: 3px solid green; 
            & .type-title { color: green;}
        }

        & .type-header {
            margin-bottom: 10px;
        }

        & .type-title {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--font-primary);
        }

        & p {
            font-size: 1rem;
            line-height: 1.7;
        }

        & p:last-child {
            margin-bottom: 0;
        }

        & blockquote {
            margin: 15px 0; 
            background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.70)}, #131212 90%);
            padding: 15px 20px;
        }
        
    }

    & a {
        color: var(--accentuate);
        text-decoration: none;
        transition: all 0.2s ease;
        border-bottom-color: var(--accentuate);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        
        &:hover {
            color: var(--secondary);
            border-bottom-color: var(--secondary);
        }

        &:visited {
            color: var(--secondary);
            border-bottom-color: var(--secondary);
        }
    }

    & img {
        display: block;
        border-radius: 8px;
        max-width: 100%;
        height: auto;
    }

    & table {
        width: 100%;
        display: table;
        white-space: normal;
        
        border-collapse: collapse;
        margin: 40px 0;
        border: none;

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            display: block;       
            overflow-x: auto;     
            white-space: nowrap; 
            
            &::-webkit-scrollbar {
                height: 8px;
            }
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 4px;
            }
            &::-webkit-scrollbar-thumb {
                background: ${HexToRgbaConverter('var(--primary)', 0.3)};
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                    background: ${HexToRgbaConverter('var(--primary)', 0.5)};
                }
            }
        }

        & thead {
            border-bottom: 2px solid var(--primary);
            & th {
                font-weight: 600;
                text-align: left;
                padding: 14px 16px;
                border: none;
                font-size: 0.9rem;
                letter-spacing: 0.5px;
                color: var(--primary);
                background: transparent;
            }
        }

        & tbody {
            & tr {
                border-bottom: 1px solid ${HexToRgbaConverter('var(--primary)', 0.15)};
                transition: background-color 0.2s ease;
                
                &:last-child { border-bottom: none; }
                &:hover { background-color: rgba(255, 255, 255, 0.02); }
            }

            & td {
                padding: 14px 16px;
                border: none;
                line-height: 1.6;
                font-size: 0.95rem;
                
                &:first-child {
                    font-weight: 500;
                }
            }
        }
    }

    & hr {
        border: none;
        height: 1px;
        background: ${HexToRgbaConverter('var(--primary)', 0.2)};
        margin: 50px 0; 
    }

    & > *:first-child { margin-top: 0; }
    & > *:last-child { margin-bottom: 0; }
    
    & h2 + h3, & h3 + h4 { margin-top: 25px; }



    .corrupted-link {
        color: #03a30b !important;
        opacity: .15; 
        cursor: default; 
        text-decoration: none;
        border-bottom: none !important;
        font-style: italic;
        user-select: none;
    }

    .corrupted-link:hover {
        animation: glitch 0.5s infinite;
    }

    @keyframes glitch {
        0%, 100% { 
            transform: translate(0); 
        }
        25% { 
            transform: translate(-4px, 5px);
            opacity: 0.2;
        }
        50% { 
            transform: translate(4px, -2px);
        }
        75% { 
            transform: translate(-2px, -px);
            opacity: .4;
        }
    }

`;