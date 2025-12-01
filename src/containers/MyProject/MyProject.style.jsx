import styled, {keyframes} from 'styled-components';
import {SCREEN_SIZE, BORDER_RADIUS, getColorSettings, GetLightSetting } from '../../config.jsx';

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
        width: 240px; 
        height: 240px; 
        border-radius: ${BORDER_RADIUS.round};
        filter: blur(48px); 
        z-index: -1; 
        animation: ${breath} 3s ease-in-out infinite;
        will-change: transform, filter;
        contain: paint;
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
    min-height: 0;
    box-sizing: border-box; 
    border-radius: ${BORDER_RADIUS.large};
    border: 1px solid ${(props) => getColorSettings(props.theme).primary};
    background: linear-gradient(135deg, #1a1a1a, #1f1f1f);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &::before{
        content: "";
        position: absolute;
        inset: 0;
        transform-origin: center;
        background-color: #272727;
        opacity: 0.4;
        filter: blur(28px);
        z-index: -1;
        pointer-events: none;
        will-change: filter;
        contain: paint;
    }

    & .tab-content{
        flex-shrink: 0; 
        
        & ul{
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            position: relative;
            background-color: rgba(0, 0, 0, 0.3);
            box-shadow: inset 0 0 10px rgba(54, 54, 54, 0.5);
            border-radius: ${BORDER_RADIUS.large} ${BORDER_RADIUS.large} 0 0;

            & li{
                cursor: pointer;
                padding: 15px 20px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                position: relative;
                transition: all 0.3s ease;
                font-weight: 500;

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    padding: 10px 15px;
                    flex: 1; 
                    justify-content: center;
                    font-size: 0.9em;
                }

                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    opacity: 0;
                    background-color: ${props => getColorSettings(props.theme).secondary};
                    transition: opacity 0.3s ease;
                }

                &:hover{
                    &::after{opacity: 0.3;}
                    color: ${props => getColorSettings(props.theme).primary};
                }

                & svg{
                    font-size: 1em;
                    transition: transform 0.3s ease;
                }

                &:hover svg {
                    transform: scale(1.1);
                }

                &.selected{
                    border-bottom: 3px solid ${props => getColorSettings(props.theme).primary};
                    color: ${props => getColorSettings(props.theme).primary};
                    
                    &::after{
                        opacity: 0.2;
                    }
                }
            }
        }
    }
    
    & [role="tabpanel"] {
        flex-direction: column;
        flex: 1;
        min-height: 0;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    & .container_preview{
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        
        & .content{
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1 1 auto;
            overflow-y: auto;
            min-height: 0; 

            & .title{
                font-size: 1.8em;
                font-weight: 700;
                color: white;
                margin-top: 5px;
                flex-shrink: 0;
                letter-spacing: 0.5px;
                transition: color 0.3s ease;
                
                &::first-letter {
                    text-transform: uppercase;
                }
            }

            & span{
                display: block;
                font-size: 0.95em;
                color: rgba(255, 255, 255, 0.6);
                font-style: italic;
                margin-bottom: 5px;
            }

            & p{
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 18px 16px;
                border-radius: ${BORDER_RADIUS.large};
                line-height: 1.6em;
                margin: 0;
                height: 220px;
                color: rgba(255, 255, 255, 0.9);
                transition: all 0.3s ease;
                flex-shrink: 0;
                
                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    height: 200px;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: ${props => getColorSettings(props.theme).primary}40;
                }

                overflow: auto;
                scrollbar-width: thin;
                scrollbar-color: ${props => getColorSettings(props.theme).primary} transparent;
                
                &::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                &::-webkit-scrollbar-track {background: transparent;}
                &::-webkit-scrollbar-thumb {
                    background-color: ${props => getColorSettings(props.theme).primary};
                    border-radius: ${BORDER_RADIUS.xlarge};
                    border: 2px solid transparent;
                }
            }

            & ul{
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
                margin: 0;
                gap: 10px;
                flex-shrink: 0;

                & li{
                    color: white;
                    padding: 6px 14px;
                    border-radius: ${BORDER_RADIUS.medium};
                    font-size: 0.85em;
                    font-weight: 500;
                    position: relative;
                    border: 1px solid ${props => getColorSettings(props.theme).primary}40;
                    background: ${props => getColorSettings(props.theme).primary}15;
                    transition: all 0.3s ease;
                    cursor: default;

                    &:hover{
                        transform: translateY(-2px);
                        background: ${props => getColorSettings(props.theme).primary};
                        box-shadow: 0 4px 12px ${props => getColorSettings(props.theme).primary}40;
                    }
                }
            }
        }
        
        & .footer{
            margin-top: auto;
            width: 100%;
            flex-shrink: 0;
            background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.3));
            position: relative;

            & .cta{
                display: flex;
                flex-wrap: wrap; 
                justify-content: flex-start;
                align-items: center;
                gap: 12px;
                padding: 20px;

                & .project_code{
                    background: ${props => getColorSettings(props.theme).primary};
                    border: 1px solid ${props => getColorSettings(props.theme).primary};
                    font-weight: 600;
                    
                    &:hover{
                        background: ${props => getColorSettings(props.theme).primary}dd;
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px ${props => getColorSettings(props.theme).primary}50;
                    }
                }
            }

            & .fenceFotter{
                padding: 10px 20px;
                background: ${props => getColorSettings(props.theme).primary};
                font-size: 0.9em;
                font-weight: 600;
                display: flex;
                
                & span{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                }
            }

            & button, & a.source_code, & a.project_code{
                padding: 10px 18px;
                font-size: 0.95em;
                font-weight: 500;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: ${BORDER_RADIUS.medium};
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                background: rgba(255, 255, 255, 0.05);
                
                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    flex: 1; 
                    font-size: 0.9em;
                    padding: 12px 10px;
                }

                &:hover{
                    background: rgba(255, 255, 255, 0.1);
                    border-color: ${props => getColorSettings(props.theme).primary};
                    transform: translateY(-2px);
                }
            }   
        }

        &.favorite{
            & .content{
                & .title{
                    color: ${props => getColorSettings(props.theme).primary};
                }
            }
        }
    }

    & .container_galery{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        padding: 20px;
        max-height: 550px;
        overflow-y: auto;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            grid-template-columns: 1fr;
            max-height: none;
            height: auto;
            overflow: visible; 
        }
        @media (min-width: ${SCREEN_SIZE.mobile}) and (max-width: ${SCREEN_SIZE.tablet}) {
            grid-template-columns: repeat(2, 1fr);
        }

        scrollbar-width: thin;
        scrollbar-color: ${props => getColorSettings(props.theme).primary} transparent;

        & .preview_img{
            width: 100%;
            height: 150px; 
            object-fit: cover;
            border-radius: ${BORDER_RADIUS.large};
            border: 1px solid rgba(255, 255, 255, 0.15);
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            
            &:hover{
                transform: scale(1.05);
                border-color: ${props => getColorSettings(props.theme).primary};
                box-shadow: 0 8px 24px ${props => getColorSettings(props.theme).primary}30;
            }
        }
    }
`;