import styled from 'styled-components';
import { COLOR } from '../../config';

export const Container = styled.div`
    display: flex;
    background-color: #202020;
    width: 90vw;
    margin: 30px auto;
    padding: 8px;
    border-radius: 15px;

    & *{box-sizing:border-box;}

    @media (max-width: 1400px) {
        width: 99%;
        margin: 0 auto;
        border-radius: 0px;
        margin: 0 auto;
        margin-bottom: 20px;

        flex-direction: column;
    }
`

export const Info = styled.div`
    background-color: ${COLOR.primary};
    width: 30%;
    border-radius: 8px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    & .info{
        & h2{
            font-size: 2em;
            margin-bottom: 10px;
            font-variation-settings: "wght" 600;
        }

        & p{
            margin-bottom: 10px;
        }
    }


    & .contact{
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 50px;

        & span{
            line-height: 50px; 
            vertical-align: middle;
            text-align: left;
            padding-left: 20px;
        }

        & svg{
            background-color: ${COLOR.secondary};

            height: 50px;
            width: 50px;
            padding: 15px;
            float: left;
            border-radius: 50%;
        }
    }

    & .bottom{
        justify-content: flex-end;
    }

    @media (max-width: 1400px) {
        margin:0 auto;
        width: 95%;
        align-items: center;
        justify-content: center;


        padding: 0;

        & .contact{
            margin-top: 0px;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 0;
            & span{
                white-space: pre;
                font-size: 2vh;
            }
        }

        & svg{
            display: none;
        }
      
    }
`

export const ContactForm = styled.div`
    padding: 5px 20px;
    margin: auto;
    width: 70%;

    @media (max-width: 1400px) {width: 100%;}
`

export const ActionForm = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;

    align-items: center;

    & span{
        color: #464646;
        cursor: pointer;
        &:hover{
            color: ${COLOR.primary};
        }
    }
`

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;
    padding: 20px;
`

export const Map = styled.div`
    background-color: red;
    height: 550px;
    width: 100%;
`