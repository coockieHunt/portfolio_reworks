import styled from 'styled-components';
import { COLOR } from '../config';

export const ToText = styled.a`
    font-variation-settings: "wght" 700;
    color: ${COLOR.secondary};
    cursor: pointer;

    border-bottom: 2px solid currentColor;

    &:hover{
        font-variation-settings: "wght" 800;
    }
`;
