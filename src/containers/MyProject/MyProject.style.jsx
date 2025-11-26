import styled, {keyframes} from 'styled-components';
import {SCREEN_SIZE, getColorSettings, GetLightSetting } from '../../config.jsx';

const breath = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.7; }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    width: 85%;
    position: relative;
    @media (max-width: ${SCREEN_SIZE.mobile}) {width: 90%;}

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 300px; 
        height: 300px; 
        border-radius: 50%;
        filter: blur(80px); 
        z-index: -1; 
        animation: ${breath} 3s ease-in-out infinite;
    }

    &::before {
        left: -300px;
        background: radial-gradient(circle, ${props => getColorSettings(props.theme).primary} 0%, rgba(147, 112, 219, 0) 70%); 
    }

    &::after {
        right: -300px;
        background: radial-gradient(circle, ${props => getColorSettings(props.theme).secondary} 0%, rgba(0, 255, 255, 0) 90%);
    }

    @media (max-width: 1200px) {padding-bottom: 30px;}
`

export const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid ${(props) => getColorSettings(props.theme).primary};
    transform: scale(1);
    transition: transform 0.3s ease;

    &::before{
        content: "";
        position: absolute;
        inset: 0;
        transform-origin: center;
        background-color: #272727;
        opacity: 0.7;
        filter: blur(100px);
        z-index: -1;
        pointer-events: none;
        opacity: .4;
    }

    & .tab-content{
        & ul{
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            border-bottom: 1px solid #ffffff6f;
            position: relative;
            background-color: #00000045;
            box-shadow: inset 0 0 10px #36363675;

            & li{
                cursor: pointer;
                padding: 15px 20px;
                border-right: 1px solid #ffffff28;
                border-bottom: 3px solid transparent;
                display: flex;
                align-items: center;
                gap: 15px;
                position: relative;

                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    opacity: 0.3;
                    background-color:  ${props => getColorSettings(props.theme).secondary};
                }

                &:hover{&::after{opacity: .6;}}

                & svg{
                    font-size: 0.9em;
                    margin-top: 5px;
                }

                &.selected{border-bottom: 3px solid ${props => getColorSettings(props.theme).primary};}
            }
        }
    }
    

    & .container_preview{
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        flex: 1 1 auto;
        min-height: 0; 

        & .content{
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;

            & .title{
                font-size: 1.5em;
                position: relative;
                font-weight: 500;
                font-size: 1.4em;
                padding-bottom: 4px;

                margin-top: 10px;
                &::first-letter {text-transform: uppercase;}
            }

            & span{
                font-size: .9em;
                opacity: 0.8;
                display: block;
                overflow: hidden;
                max-width: 100%;
                height: 2.3em;
            }

            & p{
                border: 1px solid #ffffff30;
                padding: 15px 10px;
                border-radius: 5px;
                line-height: 1.5em;
                margin: 0;
                height: 270px;
                overflow: auto;

                // custom scrollbar small end remove background
                scrollbar-width: thin;
                scrollbar-color: ${props => getColorSettings(props.theme).primary} transparent;
                scrollbar-width: thin;
                
                &::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                &::-webkit-scrollbar-track {background: transparent;}
                &::-webkit-scrollbar-thumb {
                    background-color: ${props => getColorSettings(props.theme).primary};
                    border-radius: 6px;
                    border: 2px solid transparent;
                }
            }

            & ul{
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
                margin: 0;
                gap: 8px;

                & li{
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin: 0;
                    font-size: 0.9em;
                    position: relative;
                    overflow: hidden;

                    border: 1px solid #ffffff22;

                    &::after{
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                        opacity: 0.3;
                        background-color:  ${props => getColorSettings(props.theme).primary};
                    }
                }
            }
        }
        & .footer{
            margin-top: auto;
            width: 100%;

            & .cta{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 5px;

                padding: 15px 15px;

                & .project_code{
                    background-color: ${props => getColorSettings(props.theme).secondary};
                }
            }

            & .fenceFotter{
                padding: 6px 10px;
                background-color: ${props => getColorSettings(props.theme).primary};
                font-size: 0.9em;
                & span{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 10px;
                }
            }

            & button, & a.source_code, & a.project_code{
                margin-right: 10px;
                padding: 10px 15px;
                font-size: 1em;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all .3s ease;
                text-decoration: none;

                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;

                background-color: ${props => getColorSettings(props.theme).background_secondary};

                &:hover{background-color: ${props => getColorSettings(props.theme).secondary};}
            }   
        }

        &.favorite{
            & .content{& .title{color: ${props => getColorSettings(props.theme).primary};}}
        }
    }

    & .container_galery{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        gap: 10px;
        padding: 15px;

        max-height: 550px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 8px;
        background-color: transparent;
        padding-bottom: 20px;

        width: 100%;
        margin: 0 auto;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            grid-template-columns: repeat(1, 1fr);
            max-height: 500px;
        }
        @media (max-width: ${SCREEN_SIZE.tablet}) {
            grid-template-columns: repeat(2, 1fr);
        }

        scrollbar-width: thin;
        scrollbar-color: ${props => getColorSettings(props.theme).primary} transparent;

        & .skeleton-wrapper{
            background-color: #fcfcfc3b;
            width: 200px;
            height: 200px;
            border-radius: 5px;
        }

        &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        &::-webkit-scrollbar-track {background: transparent;}
        &::-webkit-scrollbar-thumb {
            background-color: ${props => getColorSettings(props.theme).primary};
            border-radius: 6px;
            border: 2px solid transparent;
            background-clip: padding-box;
        }

        & .preview_img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 5px;
            border: 1px solid #ffffff30;
            box-shadow: 0 0 10px #000000b0;
            cursor: pointer;


            &:hover{transform: scale(1.02);transition: all .3s ease;}
        }
    }
    @media (min-width: ${SCREEN_SIZE.mobile}) {&:hover{transition: all .6s ease;}}
    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        margin: 0 auto;

        & .tab-content ul {flex-wrap: wrap;}
        & .content {padding: 12px;}

        & .container_preview .content p{
            height: auto;
            max-height: none;
        }
    }
`
