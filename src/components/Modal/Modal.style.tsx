import styled from 'styled-components';
import { m } from 'framer-motion';
import { BORDER_RADIUS } from '../../config';

export interface IModalStyleProps {
    $light: 'light' | 'dark';
}

export const ModalDiv = styled(m.div)<IModalStyleProps>`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 550px;
    background: var(--background-secondary);
    border-radius: ${BORDER_RADIUS.xlarge};
`;

export const Content = styled.div<IModalStyleProps>`
    padding: 25px;
    font-variation-settings: 'wght' 300;
    font-size: 1em;

    & h1 {
        color: var(--primary);
        font-size: 1.3em;

        display: inline-block;
        width: 100%;
        font-variation-settings: 'wght' 600;
        text-align: center;

        padding-bottom: 15px;
    }
`;

export const Top = styled.div`
    display: flex;
    justify-content: end;

    & > svg,
    & > button {
        margin: 10px 20px 0;
        color: var(--primary);
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: ${BORDER_RADIUS.round};
    }

    & > button:focus {
        outline: none;
    }

    & > button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--primary);
    }

    & > button > svg {
        color: inherit;
    }
`;
