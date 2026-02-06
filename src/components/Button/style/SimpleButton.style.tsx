import styled from 'styled-components';
import { SCREEN_SIZE } from '../../../config';
import { rainbowShift } from '../../../styles/utils.style';

export const StyledSimpleButton = styled.button`
    appearance: none;
    background-color: var(--background-secondary);
    border: 1px solid transparent;
    text-align: left;
    font-size: 1em;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    & .color{
        display: flex;
        flex-direction: row;
        gap: 5px;
    }

    &.current {
        border: 2px dashed var(--border-dark);
    }

    &:not(.current):hover {
        transform: scale(1.02);
        box-shadow: 0 0 10px var(--primary);
    }

    & span {
        font-variation-settings: 'wght' 500;
        margin-left: 10px;
        @media (max-width: ${SCREEN_SIZE.mobile}) {
            margin-left: 5px;
            font-size: 0.85em;
        }
    }

    &.contrast {
        justify-content: center;
        border: 1px dashed var(--border-dark);
        &:hover {
            background-color: var(--background-color);
        }
        &.active {
            background-color: var(--primary);
            color: var(--background);
        }
    }

    &.random {
        width: 100%;
        border: none;

        background: linear-gradient(
            90deg,
            #cc0033 0%,
            #cc6300 16%,
            #a68a00 32%,
            #1f8a1f 48%,
            #263699 64%,
            #264ccc 80%,
            #8026cc 100%,
            #cc0033 116%
        );
        background-size: 200% 200%;
        animation: ${rainbowShift} 4s ease infinite;
        font-size: 1em;

        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;

        border-radius: 5px;
        gap: 20px;
        padding: 15px;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            flex-direction: column;
        }

        & .content-random {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        & .counter-random {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            padding: 10px 20px;
            border-radius: 5px;
            border: 1px dashed var(--border-dark);

            gap: 5px;
            & .count {
                font-size: 1.8em;
                font-weight: 800;
                line-height: 1;
            }
            & span {
                font-size: 0.8em;
                font-weight: 400;
            }
        }

        & p {
            margin: 0;
            font-size: 0.85em;
            text-shadow: -1px -1px 2px #000000;
            text-align: center;
            color: white;
        }

        & span {
            margin-left: 0;
            font-variation-settings: 'wght' 600;
            font-size: 1.3em;
            text-shadow: -1px -1px 2px #000000;
            text-align: center;
            color: white;
        }
    }

    & span {
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;
