import styled from 'styled-components';

import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE } from '@/config.js';

export const Container = styled.div`margin-bottom: 100px;`;

export const ContainerPost = styled.div`
    margin: 0 auto;
    display: flex;
    gap: 40px;
    width: 90%;

    & .other {
        background-color: var(--secondary);
        padding: 20px;
        border-radius: 8px;

        & span {
            font-weight: bold;
        }

        & p {
            margin-top: 10px;
            color: var(--font-subtle);
        }
    }

    & .action {
        background-color: var(--background-secondary);
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
                border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.3)};

                padding: 5px 13px;
                background-color: ${HexToRgbaConverter('var(--primary)', 0.1)};
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
            background-color: color-mix(in srgb, var(--background-secondary) 20%, #000000 80%);
            position: relative;
            border-radius: 16px;

            & .author-info {
                padding: 20px;
                border-top: 2px solid var(--border);

                & h3 {
                    margin-bottom: 15px;
                    color: var(--font);
                }

                & p {
                    color: var(--font-subtle);
                    margin: 5px 0;
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
