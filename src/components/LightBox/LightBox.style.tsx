import styled from 'styled-components';
import { BORDER_RADIUS } from '../../config';

export const LightBoxContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    pointer-events: none;
`;

export const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    pointer-events: auto;
    position: relative;

    & img {
        max-width: 90%;
        max-height: 80vh;
        border-radius: ${BORDER_RADIUS.xlarge};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        cursor: default;
        background-color: var(--background-secondary);
    }
`;

export const AltText = styled.p`
    color: var(--font-subtle);
    font-size: 0.95em;
    text-align: center;
    max-width: 90%;
    margin: 0;
    line-height: 1.5;
`;

export const CloseButton = styled.button`
    position: fixed;
    top: 30px;
    right: 30px;
    background: var(--background-color);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    cursor: pointer;
    color: var(--primary);
    transition: all 0.3s ease;
    z-index: 1201;
    padding: 0;
    line-height: 1;
    border: none;

    &:hover {
        background: var(--primary);
        color: var(--background);
        transform: rotate(90deg) scale(1.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: rotate(90deg) scale(0.95);
    }
`;
