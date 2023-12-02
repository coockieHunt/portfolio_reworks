import styled from 'styled-components';
import { getColorSettings } from '../../../config';

export const ToText = styled.a`
    font-variation-settings: "wght" 700;
    cursor: pointer;
    border-bottom: 2px solid currentColor;
    &:hover{font-variation-settings: "wght" 800;}
`;
