import styled from 'styled-components';
import { COLOR, getColorSettings } from '../../config.jsx';


export const Quoute = styled.h2`
    background-color: ${props => getColorSettings(props.theme).primary};
    color: white;
    text-align: center;
    padding: 50px;
    font-size: 2em;
    font-variation-settings: "wght" 700;
`