import styled, { keyframes } from 'styled-components';
import { SCREEN_SIZE } from '@/config.js';

//desctivate
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
    contain: layout style;
    content-visibility: auto;

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




