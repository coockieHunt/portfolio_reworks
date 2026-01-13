import styled, { keyframes } from 'styled-components';
import { BORDER_RADIUS } from '@/config';
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

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
`;


export const Grid = styled.div`
    & ul{
        display: flex;
        gap: 20px;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }
   

`;


