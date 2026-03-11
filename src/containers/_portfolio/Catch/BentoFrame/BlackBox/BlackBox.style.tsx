import styled from 'styled-components';
import { BentoFrameComponent } from '@/components/Bento/Bento.component';

export const BlackBox = styled(BentoFrameComponent)`
    min-height: 200px;
    overflow: hidden;

    & .frame {
        position: relative;
        height: 220px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .centerText {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        z-index: 1;
        user-select: none;
        letter-spacing: 4px;
        white-space: nowrap;
        transition: color 0.6s ease;
    }

    & .orbit {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: visible;
    }

    & .focusCursor {
        position: absolute;
        top: 75%;
        left: 50%;
        width: 36px;
        height: 36px;
        margin-left: -18px;
        margin-top: -18px;
        border-radius: 50%;
        border: 1.5px solid var(--primary);
        background-color: rgba(255, 255, 255, 0.01);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
        --cursor-wave-color: var(--primary);
    }

    & .focusCursorDot {
        width: 3px;
        height: 3px;
        background-color: var(--primary);
        border-radius: 50%;
    }
`;