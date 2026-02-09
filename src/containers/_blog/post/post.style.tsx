import styled from 'styled-components';

import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE } from '@/config.js';

export const Container = styled.div`
    margin-bottom: 100px;
    contain: layout style;
`;

export const ContainerPost = styled.div`
    margin: 0 auto;
    display: flex;
    gap: 40px;
    width: 90%;
    contain: layout style;

    & .other {
        background-color: var(--background-elevated);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);

        border: 1px solid var(--border-subtle);

        & span {
            font-weight: 700;
            font-size: 1.5em;
            color: var(--primary);
            display: block;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        & p {
            margin-top: 0;
            line-height: 1.6;
            font-size: 0.95em;
        }
    }

    & .action {
        background-color: var(--background-color);
        border: 1px solid var(--border-subtle);

        padding: 5px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-radius: 8px;
        padding: 15px 20px;

        & > .nav {
            display: flex;
            align-items: center;
            gap: 15px;

            & span {
                display: flex;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                padding: 5px 5px;

                &:hover {
                    color: var(--secondary);

                    & svg {
                        transform: translateX(-2px);
                    }
                }
            }
        }

        & > .info {
            display: flex;
            align-items: center;
            gap: 15px;

            & span {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--font-subtle);
                border-radius: 8px;
                border: 1px solid ${HexToRgbaConverter('var(--border-dark)', 0.3)};

                padding: 5px 13px;
                background-color: ${HexToRgbaConverter('var(--border-dark)', 0.1)};
            }


        }
    }

    & .post {
        max-width: 75%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        gap: 25px;

        & .content {
            padding: 30px;
            background-color: var(--background-elevated);
            position: relative;
            border-radius: 16px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border: 1px dashed var(--border-subtle);

            & .author-info {
                padding: 20px;
                border-top: 2px solid var(--border-dark);
                margin-top: 30px;
                
                & h3 {
                    margin-bottom: 15px;
                    color: var(--font);
                }

                & p {
                    color: var(--font-subtle);
                    margin: 5px 0;
                }
            }

            & .author-section {
                padding: 25px;
                margin-top: 30px;
                background: var(--background-color);
                border-radius: 12px;
                border: 1px solid var(--border-subtle);
                
                & .author-name {
                    font-size: 1.5em;
                    font-weight: 700;
                    color: var(--primary);
                    margin-bottom: 10px;
                }
                
                & .author-bio {
                    color: var(--font);
                    line-height: 1.6;
                    font-size: 0.95em;
                    margin: 0;
                }
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column-reverse;
        width: 95%;

        & .action {
            flex-direction: column;
            align-items: flex-start;
            font-size: 14px;

            & > .nav {
               & svg {
                    width: 1.55rem;
                }
            }

            & > .info{
                flex-direction: column;
                align-items: flex-start;
                width: 100%;

                & span {
                    display: flex;
                    gap: 15px;
                    width: 100%;
                    padding: 10px 10px;
                }
            }
        }

        & .post {
            max-width: 100%;

            & .content {
                padding: 15px;
            }
        }
    }
`;
