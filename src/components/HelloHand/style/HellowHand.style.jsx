import styled, { keyframes } from 'styled-components';

const Hand_hello = keyframes`
    0%, 60%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
`;

export const Hand = styled.span`
    cursor: pointer;
    &:hover{
        animation:  ${Hand_hello} 2.5s infinite;
        display: inline-block;
    }

`