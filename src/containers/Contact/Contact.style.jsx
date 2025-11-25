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
    
    --breath-color: ${props => getColorSettings(props.theme).primary};
    --shadow-blur-min: 30px;
    --shadow-blur-max: 50px;
    --shadow-spread-min: 4px;
    --shadow-spread-max: 10px;
    
    box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
    transition: box-shadow 0.3s ease;

    animation: breathe 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    @keyframes breathe {
        0%, 100% {
            box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
        }
        25% {
            box-shadow: 0 6px 37px var(--breath-color);
        }
        50% {
            box-shadow: 0 var(--shadow-spread-max) var(--shadow-blur-max) var(--breath-color);
        }
        75% {
            box-shadow: 0 6px 37px var(--breath-color);
        }
    }
    
    
    @media (max-width: 1400px) {
        width: 95%;
        margin: 0 auto;
        margin-bottom: 20px;
        flex-direction: column;
        background-color: transparent;
        padding: 10px;
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


        @media (max-width: 1400px) {
            border: 1px dashed transparent;
        }
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

        & .desktop-info, & .desktop-bottom {
            display: none;
        }

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
        padding: 5px 15px;
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
