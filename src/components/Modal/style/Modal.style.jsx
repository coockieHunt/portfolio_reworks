
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLOR } from "../../../config";

export const ModalDiv = styled(motion.div)`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 380px;
    height: auto;
    background: #292929;
    border-radius: 10px;
`;

export const Content = styled.div`
    padding: 20px;
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
    align-items: right;
    justify-content: end;
    & > svg{
        margin: 20px 20px 00;
        color: ${COLOR.primary};
        cursor: pointer;
    }
`


export const BackDrop = styled(motion.div)`
    background: #18104b40;
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    cursor: pointer;
`

