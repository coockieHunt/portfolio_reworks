import styled from 'styled-components';
import { SCREEN_SIZE } from '@/config.js';

export const Section = styled.div`
    position: relative;
    overflow: hidden;
    padding: 60px 100px;

    & .head {
        margin-bottom: 12px;
        pointer-events: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;

        & h1 {
            color: var(--primary);
            font-size: 1rem;      
            letter-spacing: 0.08em;
            font-weight: 400;         
            text-transform: uppercase;
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 60px 20px;
    }
`;







