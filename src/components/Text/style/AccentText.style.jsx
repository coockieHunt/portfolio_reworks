import styled from 'styled-components';
import { getColorSettings } from '../../../config.tsx';

export const Text = styled.span`
    color: ${props => getColorSettings(props.theme).primary};
    font-variation-settings: "wght" 800;
`;
