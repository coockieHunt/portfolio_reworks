
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getColorSettings, GetLightSetting } from '../../../config';


export const ModalDiv = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 22;
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 550px;
    background: ${props=> GetLightSetting(props.light).background_secondary}; 
    border-radius: 10px;
`;

export const Content = styled.div`
    padding: 25px;
    font-variation-settings: "wght" 300;
    font-size: 1em;

    & h1{
        color: ${props => getColorSettings(props.theme).primary};
        font-size: 1.3em;

        display: inline-block;
        width: 100%;
        font-variation-settings: "wght" 600;
        text-align: center;

        padding-bottom: 15px;
    }

`

export const Top = styled.div`
    display: flex;
    justify-content: end;

    & > svg,
    & > button {
        margin: 10px 20px 0;
        color: ${props => getColorSettings(props.theme).primary};
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    & > button:focus {
        outline: 2px solid ${props => getColorSettings(props.theme).primary};
        outline-offset: 3px;
    }

    & > button > svg {
        color: inherit;
    }
`


export const BackDrop = styled(motion.div)`
    background: #05030f63;
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;

    cursor: pointer;
`

