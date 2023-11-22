
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLOR } from "../../../config";

export const ModalDiv = styled(motion.div)`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 550px;
    background: #292929;
    border-radius: 10px;
`;

export const Content = styled.div`
    padding: 25px;
    font-variation-settings: "wght" 300;
    font-size: 1em;

    & h1{
        color: ${COLOR.primary};
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

    & > svg{
        margin: 10px 20px 00;
        color: ${COLOR.primary};
        cursor: pointer;
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
    z-index: 9999;

    cursor: pointer;
`

