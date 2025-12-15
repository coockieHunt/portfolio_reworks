import styled from 'styled-components';
import { getColorSettings } from '../../config';

export const Quoute = styled.h2`
    text-align: center;
    padding: 50px;
    font-size: 2em;
    font-variation-settings: "wght" 700;
    position: relative;

    & svg {
        margin: 0 10px;
        color: ${props => getColorSettings(props.theme).accentuate};
        width: 30px;
        height: 30px;
    } 
`;
