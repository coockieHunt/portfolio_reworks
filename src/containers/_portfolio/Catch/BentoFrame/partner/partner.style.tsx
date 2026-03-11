import styled from 'styled-components';
import { BentoFrameComponent } from '@/components/Bento/Bento.component';

export const Partner = styled(BentoFrameComponent)`
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.3s ease;
    cursor: none;
    touch-action: none;

    min-height: 300px;

    @media (pointer: coarse) {
        cursor: default;
    }

   
    background-image: radial-gradient(
        circle,
        #38373736 2px,
        transparent 2px
    );
    
    background-size: 20px 20px;
    background-position: 0 0;

    @keyframes partnerLink {
        from { stroke-dashoffset: 0; }
        to   { stroke-dashoffset: -20; } 
    }

    @keyframes orbitFloat {
        0% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(8px, -10px, 0) scale(1.06); }
        100% { transform: translate3d(0, 0, 0) scale(1); }
    }

    @keyframes scanSweep {
        0% { transform: translateX(-22%) rotate(-10deg); opacity: 0.08; }
        50% { opacity: 0.16; }
        100% { transform: translateX(22%) rotate(-10deg); opacity: 0.08; }
    }


    & .dot-tint {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background-image: radial-gradient(
            circle,
            var(--dot-color) 2px,
            transparent 2px
        );
        background-size: 20px 20px;
        background-position: 0 0;
        opacity: 1;
        -webkit-mask-image: radial-gradient(
            circle 35px at var(--mask-x, 50%) var(--mask-y, 50%),
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 72%,
            rgba(0, 0, 0, 0) 100%
        );
        mask-image: radial-gradient(
            circle 35px at var(--mask-x, 50%) var(--mask-y, 50%),
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 72%,
            rgba(0, 0, 0, 0) 100%
        );
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
    }

    & .dot-tint-you {
        z-index: 1;
    }

    & .background-decor {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;

        & .orb {
            position: absolute;
            border-radius: 999px;
            filter: blur(2px);
            opacity: 0.2;
            animation: orbitFloat 7s ease-in-out infinite;
        }

        & .orb-primary {
            width: 120px;
            height: 120px;
            top: -18px;
            left: -12px;
            background: radial-gradient(circle at center, var(--primary), transparent 70%);
        }

        & .orb-secondary {
            width: 140px;
            height: 140px;
            right: -32px;
            bottom: -40px;
            opacity: 0.16;
            background: radial-gradient(circle at center, var(--secondary), transparent 70%);
            animation-duration: 9s;
            animation-delay: -1.8s;
        }

        & .scanline {
            position: absolute;
            top: -10%;
            bottom: -10%;
            left: 35%;
            width: 2px;
            background: linear-gradient(to bottom, transparent, var(--primary), transparent);
            animation: scanSweep 6.5s ease-in-out infinite;
        }
    }

    & .cursor {
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
        user-select: none;
        z-index: 2;

        & .bento-wave {
            width: 15px;
            height: 15px;
            border-width: 1px;
        }

        & .label{
            position: absolute;
            top: 0;
            left: 20px;
            transform: translateY(-50%);
            background-color: var(--background-color);
            padding: 2px 10px;
            font-weight: 500;
            white-space: nowrap;
        }

        &.cursor-me {
            top: 0;
            left: 0;
        }

        &.cursor-you {
            top: 0;
            left: 0;
        }
    }

    & .footer {
        gap: 8px;
    }

    & .sync-progress-track {
        position: absolute;
        top: 42px;
        left: 50%;
        transform: translateX(-50%);
        width: 92px;
        height: 3px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--primary), transparent 84%);
        overflow: hidden;
        z-index: 4;
        pointer-events: none;
    }

    & .sync-progress {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: var(--primary);
        transform-origin: left center;
        display: block;
    }
`;