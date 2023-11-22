import styled from 'styled-components';
import { COLOR } from '../../config';
import { color } from 'framer-motion';

// Container
export const Container = styled.div`
    display: flex;
    background-color: #202020;
    width: 90vw;
    margin: 50px auto;
    padding: 8px;
    border-radius: 15px;
    
    & * {
        box-sizing: border-box;
    }
    @media (max-width: 1400px) {
        width: 99%;
        margin: 0 auto;
        border-radius: 0px;
        margin-bottom: 20px;
        flex-direction: column;
    }
`;

export const Info = styled.div`
    background-color: ${COLOR.primary};
    width: 30%;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  
    & .info {
        & h2 {
            font-size: 2em;
            margin-bottom: 10px;
            font-variation-settings: "wght" 600;
        }

        & p {
            margin-bottom: 10px;
        }
    }

    & .contact {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 50px;
        transition: all .3s ease-in-out;

        & span {
            line-height: 50px;
            vertical-align: middle;
            text-align: left;
            padding-left: 20px;
        }

        & svg {
            background-color: ${COLOR.secondary};
            height: 50px;
            width: 50px;
            padding: 15px;
            float: left;
            border-radius: 50%;
        }

        & .info:hover{
            background-color: ${COLOR.secondary};
            transition: all .3s ease-in-out;
        }

        & .info{
            border-radius: 10px;
        }
    }

    & .bottom {
        justify-content: flex-end;
    }

    @media (max-width: 1400px) {
        margin: 0 auto;
        width: 95%;
        padding: 0;
        overflow: hidden;

        & .contact {
            margin-top: 0px;
            flex-wrap: wrap;
            justify-content: space-around;
            flex-direction: row;
            padding: 0;
            gap: 0;

            & .info{
                width: 100%;
                border-radius: 0px;
                padding: 5px;
            }        
        }
    }
`;

export const ContactForm = styled.div`
    padding: 5px 20px;
    margin: auto;
    width: 70%;

    @media (max-width: 1400px) {
        width: 100%;
    }
`;

export const ActionForm = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        color: #464646;
        cursor: pointer;
        &:hover {
            color: ${COLOR.primary};
        }
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;
    padding: 20px;
`;
