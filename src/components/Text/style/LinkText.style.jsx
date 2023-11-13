import styled from 'styled-components';
import { STYLE } from '../config/main';

export const ToText = styled.a`
    font-variation-settings: "wght" 700;
    color: ${STYLE.secondary};
    cursor: pointer;

    border-bottom: 2px solid currentColor;

    &:hover{
        font-variation-settings: "wght" 800;
    }
`;
