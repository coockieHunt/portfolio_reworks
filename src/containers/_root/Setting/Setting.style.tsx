import styled from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';

export const Toggle = styled.button<{ $isOpen: boolean }>`
    position: fixed;
    z-index: 1300;
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    top: 30%;
    right: 0px;
    opacity: ${(props) => (props.$isOpen ? '0' : '1')};
    pointer-events: ${(props) => (props.$isOpen ? 'none' : 'auto')};

    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-secondary);
    border: 1px solid var(--border-dark);

    padding: 15px 5px;
    border-radius: 0 10px 10px 0;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    border-left: none;

    writing-mode: vertical-lr;
    transform: rotate(180deg);

    & svg {
        display: none;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        top: auto;
        bottom: 30px;
        right: 20px;

        transform: ${(props) => (props.$isOpen ? 'scale(0.5)' : 'scale(1)')};

        writing-mode: horizontal-tb;
        border-left: 1px solid var(--border-dark);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        padding: 15px;
        border-radius: 50px;

        & span {
            display: none;
        }
        & svg {
            display: block;
        }
    }
`;

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 1200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 85vw;
    height: 90dvh;
    max-width: 1728px;
    max-height: 972px;

    border-radius: ${BORDER_RADIUS.xlarge};
    display: flex;
    flex-direction: column;

    background-color: var(--background-color);
    border: 1px dashed var(--border-subtle);

    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.521);


    @media (max-width: ${SCREEN_SIZE.mobile}) {
        left: auto;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        width: 90vw;
        height: 95dvh;
        max-width: none;
        max-height: none;
        border-radius: 5px;
        border: 1px solid var(--border-dark);
        border-left: 1px solid var(--border-dark);
    }

    &.close {
        transform: translate(100vw, -50%);
        @media (max-width: ${SCREEN_SIZE.mobile}) {
            top: 0%;
            right: -50%;
            transform: translate(50%, -50%);
        }
    }

  

    & .header {
        flex-shrink: 0;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dashed #ffffff18;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            border-radius: 15px 15px 0 0;
        }

        & h3 {
            margin: 0;
            font-size: 2em;
            font-variation-settings: 'wght' 600;
            color: var(--primary);
        }
    }

    & .footer {
        flex-shrink: 0;
        padding: 15px;
        text-align: center;
        border-top: 1px dashed #ffffff49;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            border-radius: 0 0 15px 15px;
        }

        & p {
            margin: 0;
            font-size: 0.9em;
            color: var(--font-subtle);
            opacity: 0.7;
            font-variation-settings: 'wght' 300;
        }
    }
`;

export const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px;

    & h3 {
        font-variation-settings: 'wght' 600;
        margin: 0 0 15px 0;
        font-size: 1.2em;

        & span {
            font-size: 0.8em;
            color: var(--font-subtle);
            opacity: 0.7;
            margin-left: 10px;

            & svg {
                vertical-align: middle;
                transition: all 0.2s;
                cursor: pointer;
                color: var(--font-subtle);
               
            }
        }
    }

    & .ContainerButton {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 20px;
        align-items: start;

        & .ThemesContainer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 20px;
            row-gap: 10px;
        }

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            width: 100%;

            & .ThemesContainer {
                grid-template-columns: 1fr;
                width: 100%;
                box-sizing: border-box;
            }

            & h3 {
                margin: 0 0 20px 0;
            }
        }
    }
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    color: var(--secondary);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
    &:hover {
        background-color: var(--background-color);
        color: var(--primary);
    }
`;
