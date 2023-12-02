import styled from 'styled-components';
import { STYLE } from '../config/main';
import { getColorSettings } from '../../../config';

export const Text = styled.span`
    color: ${props => getColorSettings(props.theme).primary};
    font-variation-settings: "wght" 800;
`;
