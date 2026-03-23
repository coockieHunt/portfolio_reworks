import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
    position: relative;
    
    mask-image: linear-gradient(
        to right,
        transparent,
        black 10%,
        black 90%,
        transparent
    );
    -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        black 10%,
        black 90%,
        transparent
    );
`;

export const Track = styled(motion.div)`
    display: flex;
    width: max-content;
    gap: 40px; 
    will-change: transform;

    @media (min-width: 768px) {
        gap: 80px;
    }
`;

interface StackProps {
    $iconSize?: number;
    $iconColor?: string;
}

export const Stack = styled.div<StackProps>`
    display: flex;
    align-items: center;
    flex-shrink: 0;

    & a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        padding: 10px 15px;
        gap: 12px;
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

        & svg {
            font-size: ${(props) => props.$iconSize || 24}px;
            width: 1em;
            height: 1em;
            color: ${(props) => props.$iconColor || '#FFFFFF'};
            transition: color 0.3s ease;
            display: block; 
        }

        & h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: inherit;
            line-height: 1.2;
        }

        &:hover {
            background: ${(props) => 
                props.$iconColor 
                ? `${props.$iconColor}1A` 
                : 'rgba(255, 255, 255, 0.1)'
            };
        }
    }
`;