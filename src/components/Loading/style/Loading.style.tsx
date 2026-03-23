import styled from 'styled-components';
import { SCREEN_SIZE } from '../../../config';
import { fadeInOut, slideUp, slideDown } from '../../../styles/utils.style';

interface IPanelProps {
    $color: string;
    $duration: number;
}

interface IContentProps {
    $duration: number;
    $textColor?: string;
}

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`;

export const Content = styled.div<IContentProps>`
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 1000001;
    width: fit-content;
    height: fit-content;

    font-size: 2vw;
    color: ${({ $textColor }) => $textColor || 'white'};
    line-height: 1;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    animation: ${fadeInOut} ${({ $duration }) => Math.max(0, $duration - 300)}ms
        ease-in-out forwards;
    gap: 10px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        font-size: 3.5vw;
    }
`;

const Panel = styled.div<IPanelProps>`
    position: absolute;
    left: 0;
    width: 100%;
    height: 51%;
    background-color: ${({ $color }) => $color};
    z-index: 1000000;
    will-change: transform;
`;

export const TopPanel = styled(Panel)`
    top: 0;
    animation: ${slideUp} ${({ $duration }) => $duration}ms
        cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;

export const BottomPanel = styled(Panel)`
    bottom: 0;
    animation: ${slideDown} ${({ $duration }) => $duration}ms
        cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;
