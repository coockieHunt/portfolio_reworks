import styled from 'styled-components';

import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

export const Container = styled.div`
    .back-button {
        position: fixed;
        top: 70px;
        left: 70px;

        z-index: 10;
    }
`;

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

        & > .right {
            display: flex;
            align-items: center;
            gap: 15px;

            & span {
                display: flex;
                align-items: center;
                gap: 7px;
                color: var(--font-subtle);
                cursor: pointer;

                & :hover {
                    color: var(--primary);
                }
            }
        }

        & > .left {
            display: flex;
            align-items: center;
            gap: 15px;

            & span {
                display: flex;
                align-items: center;
                gap: 7px;
                color: var(--font-subtle);

                padding: 5px 10px;
                background-color: ${HexToRgbaConverter('var(--primary)', 0.1)};
            }
        }
    }

    & .post {
        width: 80%;
        display: flex;
        flex-direction: column;

        gap: 25px;

        & .content {
            padding: 30px;
            background-color: ${HexToRgbaConverter(
                'var(--background-secondary)',
                0.2,
            )};
            position: relative;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;

                background-color: #2c2b2b;
            }

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

    & .info {
        flex: 1;
        position: sticky;
        top: 20px;
        align-self: start;
        max-height: 90vh;
        overflow-y: auto;

        background: rgba(255, 255, 255, 0.03);
        border: ${HexToRgbaConverter('var(--primary)', 0.1)} 1px solid;
        border-radius: 16px;
        padding: 15px;

        & h2 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 24px;
            color: var(--primary);
            letter-spacing: 0.5px;
            text-transform: uppercase;
            opacity: 0.9;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        & ul {
            display: flex;
            flex-direction: column;
            gap: 5px;

            & li {
                font-size: 0.9rem;

                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;

                list-style: none;
                border-radius: 8px;
                transition: all 0.2s ease;
                color: var(--font-subtle);

                padding: 5px;

                overflow: hidden;

                &:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--font);
                    transform: scale(1.02);
                }

                & a {
                    text-decoration: none;
                    color: inherit;
                    flex: 1;
                    line-height: 1.4;
                }

                & span {
                    display: block;
                    align-items: center;
                    justify-content: center;
                    background: var(--background-secondary);
                    cursor: pointer;

                    padding: 3px 7px;
                }
            }
        }
    }
`;
