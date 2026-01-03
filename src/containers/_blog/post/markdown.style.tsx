import styled from 'styled-components';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

export const MarkdownContent = styled.div`
    margin-top: 20px;
    line-height: 1.8; 

    /* titles */
    & h1, & h2, & h3, & h4, & h5, & h6 {font-family: "Source Code Pro", monospace;}
    
    & h1 {
        font-weight: 700;
        margin: 50px 0 25px 0;
        line-height: 1.2;
        color: var(--primary);
        border-bottom: 2px solid var(--border);
        padding-bottom: 15px;
    }

    & h2 {
        font-weight: 600;
        margin: 40px 0 20px 0; 
        line-height: 1.3;
        color: var(--primary);
    }

    & h3 {
        font-weight: 600;
        margin: 35px 0 18px 0;
        line-height: 1.4;
        color: var(--secondary);
    }

    & h4 {
        font-weight: 600;
        margin: 30px 0 15px 0;
        line-height: 1.4;
        color: var(--secondary);
    }

    & h5 {
        font-weight: 600;
        margin: 25px 0 12px 0; 
        line-height: 1.5;
        color: var(--secondary);
    }

    & h6 {
        font-weight: 600;
        margin: 20px 0 12px 0;
        line-height: 1.5;
        color: var(--secondary);
        letter-spacing: 0.5px;
    }

    /* p */
    & p {
        line-height: 1.8; 
        margin-bottom: 20px;
    }

    /* text */
    & strong {
        font-weight: 600;
    }

    & em {
        font-style: italic;
    }

    & del {
        text-decoration: line-through;
        opacity: 0.6;
        color: var(--font-hint);
    }

    /* Code */
    & pre {
        position: relative;
        margin: 25px 0;
        overflow-x: auto;

        border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.2)};
        font-family: 'Courier New', Courier, monospace;
        z-index: 1;

        padding: 20px; 
        border-radius: 4px;

        background-color: color-mix(in hsl,  ${HexToRgbaConverter('var(--primary)', 0.50)}, #000000 80%);
    }

    & code {
        position: relative;
        z-index: 2;

        color: unset;
        padding: 0;
        border: none;
        font-family: inherit;
    }

    /* list */
    & ul {
        margin: 20px 0; 
        padding-left: 30px;
        list-style-type: disc;

        & li {
            margin-bottom: 10px; 
            line-height: 1.8; 

            &::marker {
                color: var(--primary);
            }
        }

        & ul {
            margin: 10px 0;
            list-style-type: circle;

            & ul {
                list-style-type: square;
            }
        }
    }

    & ol {
        margin: 20px 0;
        padding-left: 30px;
        list-style-type: decimal;

        & li {
            margin-bottom: 10px;
            line-height: 1.8;

            &::marker {
                color: var(--primary);
                font-weight: 600;
            }
        }

        & ol {
            margin: 10px 0; 
            list-style-type: lower-alpha;

            & ol {
                list-style-type: lower-roman;
            }
        }
    }

    /* task */
    & input[type='checkbox'] {
        margin-right: 10px;
        cursor: pointer;
        accent-color: var(--primary);
    }

    /* gote */
    & blockquote {
        border-left: 4px solid var(--primary);
        padding: 20px 25px; 
        margin: 25px 0; 
        background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.70)}, #000000 90%);
        font-style: italic;
        color: var(--font-subtle);
        border-radius: 4px;

        border-left: 4px solid var(--primary);

        & p:last-child {margin-bottom: 0;} //rmove for simple quote

        & blockquote {
            margin: 15px 0; 
            border-left-color: var(--secondary);
            background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.70)}, #131212 90%);

            & blockquote {
                background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 0.90)}, #1f1e1e 90%);
            }
        }
    }

    /* linck */
    & a {
        color: var(--primary);
        text-decoration: underline;
        transition: color 0.2s ease;

        &:hover {
            color: var(--accentuate);
        }

        &:visited {
            color: var(--secondary);
        }
    }

    /* Img */
    & img {
        max-width: 100%;
        height: auto;
        margin: 25px 0;
        display: block;
        border: 1px solid color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 1)}, #000000 60%);
    }

    /* table */
    & table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0; 
        overflow-x: auto;
        display: block;
        border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.2)};


        & thead {
            background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--primary)', 1)}, #000000 80%);

            & th {
                font-weight: 600;
                text-align: left;
                padding: 15px; 
                border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.4)};
            }
        }

        & tbody {
            & tr {
                &:nth-child(even) {
                    background-color: color-mix(in hsl, ${HexToRgbaConverter('var(--background-secondary)', 0.9)}, #000000 50%);
                }

                &:hover {
                    border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.4)};
                }
            }

            & td {
                padding: 15px;
                border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.4)};
            }
        }
    }

    /* spacer */
    & hr {
        border: none;
        border-top: 1px solid ${HexToRgbaConverter('var(--primary)', 0.35)};
        margin: 25px 0; 
    }

    & > *:first-child {
        margin-top: 0;
    }

    & > *:last-child {
        margin-bottom: 0;
    }
`;