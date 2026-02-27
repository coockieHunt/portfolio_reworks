import styled, { keyframes } from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '../../config';

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

export const TerminalContainer = styled.div`
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(24, 24, 24, 0.35);
    will-change: backdrop-filter;
    isolation: isolate;

    border: 1px solid var(--border-dark);
    border-radius: ${BORDER_RADIUS.large};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    font-family: 'Consolas', 'Monaco', monospace;
    color: var(--primary);
    width: 100%;
    max-width: 70%;
    margin: 20px auto;
    overflow: hidden;
    font-size: 14px;

    border-bottom: 4px solid var(--border-dark);

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        max-width: 90%;
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;

        height: 160px;
        width: 160px;

        background-color: var(--accentuate);
        opacity: 0.15;
        z-index: -1;

        transform: translate(-50%, -50%);

        border-radius: 50%;
        filter: blur(24px);
        will-change: transform, filter;
        contain: paint;
        transition: transform 0.5s ease;
    }

    &:hover::before {
        animation: pulse 3s infinite;
        transform: translate(-50%, -50%) scale(1.4);
    }
`;

export const TerminalHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: var(--primary);
    border-bottom: 1px solid var(--border-dark);
`;

export const TerminalLine = styled.div`
    cursor: pointer;

    & p {
        margin: 10px 0 20px 0;
    }

    & .icon{
        display: flex;
    }

    & .header {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border-left: transparent 4px solid;

        border-bottom: 1px solid var(--background-secondary);
        &:last-child {
            border-bottom: none;
        }

        &:hover {
            border-left: 4px solid var(--accentuate);
            & .left {
                scale: 1.05;
            }
        }

        & .left {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-right: 100px;

            & span {
                font-weight: bold;
                opacity: 0.6;
            }

            & svg {
                margin-top: 5px;
                width: 45px;
                height: 45px;
                border: 1px solid var(--border-dark);
                border-radius: 8px;
                padding: 10px;

                transform: rotate(0deg);

                transition: all 0.3s ease;
            }
        }

        & .info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;

            font-size: 1rem;

            & .title {
                color: var(--primary);
            }

            & .subtitle {
                color: var(--font-subtle);
                font-size: 13px;
            }
        }

        & .action {
            margin-left: auto;
            display: flex;
            align-items: center;

            & svg {
                transition: transform 0.3s ease;
            }
        }
    }

    & .content {
        padding: 15px 20px;
        display: flex;
        justify-content: flex-end;

        position: relative;
        overflow: hidden;

        box-shadow: inset 0px 5px 10px -7px
            color-mix(in srgb, var(--primary) 20%, transparent);

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border-left: 4px solid var(--primary);
            height: 100%;
        }

        & .card {
            border: 1px solid #f0f0f032;
            width: 60%;
            padding: 15px;
            background-color: color-mix(
                in srgb,
                var(--background-color) 50%,
                transparent
            );
            display: flex;
            flex-direction: row;
            align-items: stretch;
            justify-content: flex-start;
            gap: 10px;

            & span {
                display: flex;
                align-items: flex-start;
                width: 60px;
                color: var(--primary);
                font-size: 1em;
                margin-top: 5px;
            }

            & p {
                flex-grow: 1;
                margin: 0;
            }
        }

        & .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 50%;
            width: 20%;
            margin-left: 20%;
            pointer-events: none;

            border-left: 2px dashed var(--accentuate);
            border-bottom: 2px dashed var(--accentuate);

            opacity: 0.4;
        }
    }

    &.selected {
        & .header {
            border-left: 4px solid var(--accentuate);

            & .left {
                & svg {
                    color: var(--accentuate);
                    border-color: var(--accentuate);
                }
            }

            & .action svg {
                transform: rotate(180deg);
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        & .header {
            gap: 8px;
            padding: 12px 8px;
            font-size: 12px;
            align-items: center;

            & .icon {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 6px;
                min-width: 0;
            }

            & .left {
                margin-right: 0px;
                flex-shrink: 0;

                & span {
                    display: none;
                }

                & svg {
                    margin-top: 0;
                    width: 40px;
                    height: 40px;
                    padding: 8px;
                }
            }

            & .info {
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 2px;
                min-width: 0;
                width: 100%;

                & .title {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                }

                & .subtitle {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    font-size: 11px;
                }
            }

            & .action {
                margin-left: auto;
                flex-shrink: 0;
                padding-left: 6px;
                align-self: center;
            }

            &:hover {
                border-left: 4px solid var(--accentuate);
            }
        }

        & .content {
            box-shadow: none;
            padding: 10px 8px;
            justify-content: center;

            &::after {
                border-left: none;
            }

            & .card {
                width: 100%;
            }

            & .card::before {
                border-left: none;
                border-bottom: none;
            }
        }
    }
`;

export const CommandPromptWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;

    &::after {
        content: '_';
        margin-left: 5px;
        animation: ${blink} 1s step-end infinite;
    }
`;

export const ServicesListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 30px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 5px 8px;
    }

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const TerminalPath = styled.span`
    margin-right: 5px;
    color: var(--font-on-primary);
`;

export const Separator = styled.span`
    margin: 0 5px;
`;
export const LineTag = styled.span`
    font-weight: bold;
`;
export const LineName = styled.span`
    font-weight: bold;
`;
export const TerminalBody = styled.div`
    line-height: 1.5;
`;