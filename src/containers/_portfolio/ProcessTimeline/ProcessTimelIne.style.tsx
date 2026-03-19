import styled from 'styled-components';
import { hex, motion } from 'framer-motion';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';

export const Container = styled.section`
    --timeline-line-x: 30px;
    --commit-node-size: 15px;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        --timeline-line-x: 20px;
        overflow: hidden;
    }

    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%, -50%);
        width: 250vw;
        height: auto;
        pointer-events: none;
    }
`;

export const WorkflowWrapper = styled.div`
    position: relative;
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px 0;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 95%;
        gap: 16px;
    }
`;

export const GitBranchLine = styled(motion.div)`
    position: absolute;
    left: var(--timeline-line-x);
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary);
    z-index: 1;
`;

export const TimeLineItemContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    width: 100%;
    padding-left: calc(var(--timeline-line-x) - (var(--commit-node-size) / 2));
    gap: 30px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        gap: 20px;
    }
`;

export const CommitNode = styled(motion.div)`
    width: var(--commit-node-size);
    height: var(--commit-node-size);
    min-width: var(--commit-node-size);
        
    background: var(--secondary);
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 10px color-mix(in srgb, var(--secondary), transparent 60%);
    transition: all 0.3s ease;
`;

export const CardContent = styled.div`
    background: ${HexToRgbaConverter('var(--background)', 0.7)};
    border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.3)};
    border-radius: ${BORDER_RADIUS.small};
    flex: 1;
    min-width: 0;
    transition: all 0.3s ease;

    user-select: none;

    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    align-items: center;
    gap: 0;

    &:hover {
        border-color: var(--primary);
        transform: scale(1.01);
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        grid-template-columns: 1fr;
    }
`;

export const CardLeft = styled.div`
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;

    .git-command {
        font-family: 'Fira Code', monospace;
        font-size: 0.72rem;
        color: var(--font-subtle);
        display: block;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 15px 28px;
    }
`;

export const CardDivider = styled.div`
    width: 1px;
    align-self: stretch;
    border-left: 1px dashed ${HexToRgbaConverter('var(--primary)', 0.3)};
    transition: background 0.3s ease;

    ${CardContent}:hover & {
        background: var(--primary);
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        height: 1px;
    }
`;

export const CardRight = styled.div`
    padding: 24px 28px;
    min-width: 0;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 15px 28px;
    }
`;

export const TimeLineTitle = styled.h3`
    font-size: 1.1rem;
    color: var(--primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .num {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--primary);
        opacity: 0.2;
        line-height: 1;
    }
`;

export const TimeLineContent = styled.p`
    font-size: 0.9rem;
    line-height: 1.65;
    margin: 0;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 12px;

    & .gitOutput {
        color: var(--font-subtle);
        font-family: 'Fira Code', monospace;
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;

        font-size: 0.8rem;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
`;
