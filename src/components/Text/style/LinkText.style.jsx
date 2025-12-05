import styled from 'styled-components';

export const ToText = styled.a`
    font-variation-settings: "wght" 700;
    cursor: pointer;
    border-bottom: 2px solid currentColor;
    display: inline-block;
    text-decoration: none;
    color: inherit;

    &:hover{
        opacity: 0.8;
        transform: scale(1.02);
        transition: all 0.1s ease-in-out;
    }
`;
