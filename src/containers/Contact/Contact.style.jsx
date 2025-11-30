import styled from 'styled-components';
import { getColorSettings, GetLightSetting } from '../../config.jsx';


import { SCREEN_SIZE } from '../../config.jsx';

// Container
export const Container = styled.div`
    display: flex;
    width: 90vw;
    margin: 50px auto 70px auto;
    border-radius: 15px;

    gap: 30px;
    
    @media ( max-width: ${SCREEN_SIZE.mobile}){
        width: 90%;
        flex-direction: column;
    }
`;

export const Text = styled.span`
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    display: inline-block;
    color: white;

    padding: 0 25px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 30%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;

    border: 1px solid ${props => getColorSettings(props.theme).primary};
    border-bottom: 8px solid ${props => getColorSettings(props.theme).primary};
    position: relative;

    & ::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1d1d1d;
        opacity: 0.2;
        z-index: -1;
        inset: 0;
        border-radius: 5px;
    }
    
    & .content {
        display: flex;
        flex-direction: column;
        height: 100%;

        & .title {
            display: flex;
            flex-direction: column;
            gap: 10px;


            padding: 10px 0 25px 0;
            & h2 {
                font-size: 1.5em;
                color: ${props => getColorSettings(props.theme).primary};
            }

            & span{
                font-size: 1em;
                color: white;
            }
        }
        
        & .container {
            display: flex;
            flex-direction: column;

            padding-bottom: 20px;


            & .ItemInfo {
                display: flex;
                align-items: center;
                gap: 15px;

                padding: 10px 0px;

                & svg {
                    height: 3em;
                    width: auto;
                    padding: 10px;
                    background-color: ${props => getColorSettings(props.theme).primary};
                    border-radius: 8px;

                    z-index: 2;
                }


                & > div {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    & .name{
                        color: #ffffffb3;
                    }
                }


                &:hover {
                   transform: scale(1.03);
                   transition: transform .2s ease;
                }
            }
        }

        & .bottom {
            margin-top: auto;
            display: block;
            border-top: 1px solid #ffffff28;
            line-height: 3em;
        }
    }



    @media ( max-width: ${SCREEN_SIZE.mobile}){
        width: 100%;

        padding: 20px;

        & .content {
            & .container {
                flex-direction: row;
                width: 100%;
                justify-content: space-between;

                & .info{
                    display: none;
                }

                & .name{
                    display: none;
                }
            }
            & .title {
                & h2 {
                    font-size: 1.2em;
                    text-align: center;
                }

                & span{
                    font-size: 0.9em;
                    text-align: center;
                }
            }

            & .bottom {
                text-align: center;
                font-size: 0.9em;
            }
        }
    }
`;

export const ContactForm = styled.div`
    margin: auto;
    width: 70%;
    padding: 30px;

    background-color: ${props => getColorSettings(props.theme).background_tertiary};
    border: 1px solid ${props => getColorSettings(props.theme).primary};
    border-bottom: 8px solid ${props => getColorSettings(props.theme).primary};


    border-radius: 5px;
        
    --breath-color: ${props => getColorSettings(props.theme).primary};
    --shadow-blur-min: 10px;
    --shadow-blur-max: 20px;
    --shadow-spread-min: 4px;
    --shadow-spread-max: 6px;
    
    box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
    transition: box-shadow 0.3s ease;

    animation: breathe 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    @keyframes breathe {
        0%, 100% {
            box-shadow: 0 var(--shadow-spread-min) var(--shadow-blur-min) var(--breath-color);
        }
        25% {
            box-shadow: 0 6px 20px var(--breath-color);
        }
        50% {
            box-shadow: 0 var(--shadow-spread-max) var(--shadow-blur-max) var(--breath-color);
        }
        75% {
            box-shadow: 0 6px 20px var(--breath-color);
        }
    }
    

    & h2 {
        font-size: 1.5em;
        color: ${props => getColorSettings(props.theme).primary};

        font-weight: 600;
    }

    @media ( max-width: ${SCREEN_SIZE.mobile}){
        width: 100%;
        padding: 20px;
        
        & h2 {
            font-size: 1.8em;
            line-height: 1.5em;
        }
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

    @media ( max-width: ${SCREEN_SIZE.mobile}){
        & .resetForm {
            display: none;
        }

        & button{
            width: 50%;
            margin: 0 auto;
        }
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 3em;
    padding: 20px;
`;
