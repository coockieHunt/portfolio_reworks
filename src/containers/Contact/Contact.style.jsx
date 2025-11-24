import styled from 'styled-components';
import { getColorSettings, GetLightSetting } from '../../config.jsx';


// Container
export const Container = styled.div`
    display: flex;
    background-color: ${props => GetLightSetting(props.theme).background_secondary};
    width: 90vw;
    margin: 50px auto;
    padding: 15px;
    border-radius: 15px;

    backdrop-filter: blur(30px);
    box-shadow: 0 4px 40px ${props => getColorSettings(props.theme).primary};

    animation: breathe 3s ease-in-out infinite;
    @keyframes breathe {
        0% {
            box-shadow: 0 4px 40px ${props => getColorSettings(props.theme).primary};
        }
        50% {
            box-shadow: 0 8px 60px ${props => getColorSettings(props.theme).primary};
        }
        100% {
            box-shadow: 0 4px 40px ${props => getColorSettings(props.theme).primary};
        }
    }
    
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
    width: 30%;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;
    isolation: isolate; 
    background-color: ${props => getColorSettings(props.theme).background};

    
    &::after{
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 8px;
        top: 0;
        left: 0;
        border: 1px dashed ${props => getColorSettings(props.theme).primary};
        opacity: 0.8;
        height: 100%;
        width: 100%;
    }

  
    & .info {
        & h2 {
            font-size: 1.8em;
            margin-bottom: 10px;
            font-weight: 500;
            color:  ${props => getColorSettings(props.theme).primary};
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

    & h2 {
        font-size: 2.5em;
        margin-bottom: 20px;
        color:  ${props => getColorSettings(props.theme).primary};
        font-weight: 600;
    }

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
