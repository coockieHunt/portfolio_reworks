import styled from "styled-components";
import { BORDER_RADIUS } from '../../../config';
import { HexToRgbaConverter } from '../../../utils/HexToRgbaConverter'
import { getColorSettings } from '../../../config';

export const LightBoxContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${props => HexToRgbaConverter(getColorSettings(props.theme).background_secondary, 0.8)};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: pointer;
    
    & img {
        max-width: 90%;
        max-height: 90%;
        border-radius: ${BORDER_RADIUS.xlarge};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        cursor: default;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: white;
    font-size: 2em;
    cursor: pointer;
`;