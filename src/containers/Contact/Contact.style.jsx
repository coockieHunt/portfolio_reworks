import styled from 'styled-components';
import { getColorSettings, GetLightSetting } from '../../config.jsx';

// Container
export const Container = styled.div`
    display: flex;
    background-color: ${props => GetLightSetting(props.theme).background_secondary};
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
        background-color: transparent;
    }
`;

export const Info = styled.div`
    background-color: ${props => getColorSettings(props.theme).primary};
    width: 30%;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
  
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

        & span {
            line-height: 50px;
            vertical-align: middle;
            text-align: left;
            padding-left: 20px;
        }

        & svg {
            height: 50px;
            width: 50px;
            padding: 15px;
            float: left;
            border-radius: 50%;
        }

        & .info{
            border-radius: 10px;
            transition: all .3s ease-in-out;
            &:hover{
                background-color: ${props => getColorSettings(props.theme).secondary};
            }
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

    & > span {
        color: #464646;
        cursor: pointer;
        &:hover {
            color: ${props => getColorSettings(props.theme).primary};
        }
    }

    & > .colored{
        color: ${props => getColorSettings(props.theme).primary};
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;
    padding: 20px;
`;
