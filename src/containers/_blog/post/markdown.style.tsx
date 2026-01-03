import styled, { keyframes } from 'styled-components';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

export const MarkdownContent = styled.div`
    margin-top: 20px;
    color: var(--font);
    line-height: 1.6;

    /* Titres */
    & h1 {
        font-weight: 700;
        margin: 40px 0 20px 0;
        line-height: 1.2;
        color: var(--primary);
        border-bottom: 2px solid var(--border);
        padding-bottom: 10px;
    }

    & h2 {
        font-weight: 600;
        margin: 35px 0 18px 0;
        line-height: 1.3;
        color: var(--primary);
    }

    & h3 {
        font-weight: 600;
        margin: 30px 0 15px 0;
        line-height: 1.4;
        color: var(--secondary);
    }

    & h4 {
        font-weight: 600;
        margin: 25px 0 12px 0;
        line-height: 1.4;
        color: var(--secondary);
    }

    & h5 {
        font-weight: 600;
        margin: 20px 0 10px 0;
        line-height: 1.5;
        color: var(--secondary);
    }

    & h6 {
        font-weight: 600;
        margin: 18px 0 10px 0;
        line-height: 1.5;
        color: var(--secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Paragraphes */
    & p {
        line-height: 1.6;
        margin-bottom: 15px;
    }

    /* Formatage de texte */
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
        margin: 20px 0;
        overflow-x: auto;

        background-color: transparent !important;

        border: 1px solid var(--border);
        font-family: 'Courier New', Courier, monospace;
        z-index: 1;
    }

    & code {
        position: relative;
        z-index: 2;

        background-color: ${HexToRgbaConverter('var(--primary)', 0.05)};
        color: unset;
        padding: 0;
        border: none;
        font-family: inherit;
    }

    pre::after {
        content: '';
        display: block;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-color: #000000;

        z-index: -1;
    }

    /* Listes */
    & ul {
        margin: 15px 0;
        padding-left: 30px;
        list-style-type: disc;

        & li {
            margin-bottom: 8px;
            line-height: 1.6;

            &::marker {
                color: var(--primary);
            }
        }

        & ul {
            margin: 8px 0;
            list-style-type: circle;

            & ul {
                list-style-type: square;
            }
        }
    }

    & ol {
        margin: 15px 0;
        padding-left: 30px;
        list-style-type: decimal;

        & li {
            margin-bottom: 8px;
            line-height: 1.6;

            &::marker {
                color: var(--primary);
                font-weight: 600;
            }
        }

        & ol {
            margin: 8px 0;
            list-style-type: lower-alpha;

            & ol {
                list-style-type: lower-roman;
            }
        }
    }

    /* Listes de tâches */
    & input[type='checkbox'] {
        margin-right: 8px;
        cursor: pointer;
        accent-color: var(--primary);
    }

    /* Citations */
    & blockquote {
        border-left: 4px solid var(--primary);
        padding: 15px 20px;
        margin: 20px 0;
        background-color: var(--background-secondary);
        font-style: italic;
        color: var(--font-subtle);
        border-radius: 4px;

        & p:last-child {
            margin-bottom: 0;
        }

        & blockquote {
            margin: 10px 0;
            border-left-color: var(--secondary);
            background-color: var(--background-tertiary);
        }
    }

    /* Liens */
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

    /* Images */
    & img {
        max-width: 100%;
        height: auto;
        margin: 20px 0;
        border-radius: 8px;
        display: block;
        border: 1px solid var(--border);
    }

    /* Tableaux */
    & table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        overflow-x: auto;
        display: block;
        border: 1px solid var(--border);
        border-radius: 8px;

        & thead {
            background-color: var(--background-secondary);

            & th {
                font-weight: 600;
                text-align: left;
                padding: 12px;
                border: 1px solid var(--border);
            }
        }

        & tbody {
            & tr {
                &:nth-child(even) {
                    background-color: var(--background-secondary);
                }

                &:hover {
                    background-color: var(--background-tertiary);
                }
            }

            & td {
                padding: 12px;
                border: 1px solid var(--border);
            }
        }
    }

    /* Séparateurs horizontaux */
    & hr {
        border: none;
        border-top: 1px dashed var(--border);
        margin: 30px 0;
    }

    /* Espacement des éléments */
    & > *:first-child {
        margin-top: 0;
    }

    & > *:last-child {
        margin-bottom: 0;
    }
`;
