import styled, { keyframes } from 'styled-components';
import { SCREEN_SIZE } from '@/config.js';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    min-height: 400px;
    contain: layout style;

    margin-bottom: 29px;
`;

export const Grid = styled.div`
    & ul{
        display: flex;
        gap: 20px;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        padding: 0 5px;
        & ul {
            gap: 30px;
        }
    }
`;

export const Empty = styled.div`
    width: 100%;
    text-align: center;
    padding: 4rem 0;
   
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;

    & strong {
        font-size: 1.7rem;
        color: var(--primary);
    }

    & .sub {
        font-size: 1rem;
        color: #555;
    }
`;


