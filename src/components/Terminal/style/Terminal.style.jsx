import styled, { keyframes } from "styled-components";
import { SCREEN_SIZE, BORDER_RADIUS, getColorSettings } from '../../../config.jsx';

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

export const TerminalContainer = styled.div`
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(24, 24, 24, 0.35);
    will-change: backdrop-filter;
    isolation: isolate;

    border: 1px solid ${props => getColorSettings(props.theme).primary};
    border-radius: ${BORDER_RADIUS.large};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    font-family: 'Consolas', 'Monaco', monospace;
    color: ${props => getColorSettings(props.theme).primary};
    width: 100%;
    max-width: 70%;
    margin: 20px auto;
    overflow: hidden;
    font-size: 14px;

    border-bottom: 4px solid ${props => getColorSettings(props.theme).primary};
    
    @media ( max-width: ${SCREEN_SIZE.mobile}) {max-width: 90%;}

    
    &::before {
        content: '';
        position: absolute;
        top: 50%;        
        left: 50%;       

      
        height: 160px;   
        width: 160px;      

        background-color: ${props => getColorSettings(props.theme).accentuate};
        opacity: 0.15;    
        z-index: -1;

        transform: translate(-50%, -50%);

        border-radius: 50%;     
        filter: blur(24px);     
        will-change: transform, filter;
        contain: paint;
        transition: transform 0.5s ease;
    }

    &:hover::before {
        animation: pulse 3s infinite;
        transform: translate(-50%, -50%) scale(1.4);
    }
`;


export const TerminalHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: ${props => getColorSettings(props.theme).primary};
    border-bottom: 1px solid ${props => getColorSettings(props.theme).primary};
    color: white;
`;

export const TerminalLine = styled.div`
    cursor: pointer;

    & p{
        color: #f0f0f0;
        margin: 10px 0 20px 0;
    }

    & .header{
        display: flex;
        padding: 10px 20px;
        border-left: transparent 4px solid;

        border-bottom: 1px solid ${props => getColorSettings(props.theme).background_secondary};
        &:last-child {border-bottom: none;}

        &:hover {
            border-left: 4px solid ${props => getColorSettings(props.theme).accentuate};
            & .left{
                scale: 1.05;
                & svg {
                    background-color: ${props => getColorSettings(props.theme).accentuate};}
                }
        }

        & .left {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-right: 100px;

            & span{
                font-weight: bold;
                opacity: 0.6;
            }

            & svg {
                margin-top: 5px;
                width: 45px;
                height: 45px;
                border: 1px solid ${props => getColorSettings(props.theme).primary};
                border-radius: 8px;
                padding: 10px;

                color: white;

                transform: rotate(0deg);

                transition: all 0.3s ease;
            }
        }

        & .info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;

            font-size: 1rem;

            & .title{color: ${props => getColorSettings(props.theme).primary};}

            & .subtitle{
                color: #aaaaaa;
                font-size: 13px;
            }
        }

        & .action { 
            margin-left: auto;
            display: flex;
            align-items: center;

            & svg {
                transition: transform 0.3s ease;
            }
        }
    }

    & .content{
        padding: 15px 20px;
        display: flex;
        justify-content: flex-end;
        
        position: relative; 
        overflow: hidden; 

        box-shadow: inset 0px 5px 10px -7px ${props => `rgba(${parseInt(getColorSettings(props.theme).primary.slice(1, 3), 16)}, ${parseInt(getColorSettings(props.theme).primary.slice(3, 5), 16)}, ${parseInt(getColorSettings(props.theme).primary.slice(5, 7), 16)}, 0.2)`};

        &::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border-left: 4px solid ${props => getColorSettings(props.theme).primary};
            height: 100%;
        }

        & .card {
            border: 1px solid #f0f0f032;
            width: 60%;
            padding: 15px;
            background-color: ${props => getColorSettings(props.theme).background_t}; 
            display: flex;
            flex-direction: row;
            align-items: stretch;
            justify-content: flex-start;
            gap: 10px;


            & span {
                display: flex; 
                align-items: flex-start; 
                width: 60px;
                color: ${props => getColorSettings(props.theme).primary};
                font-size: 1em;
                margin-top: 5px;
            }
            
            & p {
                flex-grow: 1; 
                margin: 0; 
                color: #f0f0f0;
            }
        }

        & .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 50%;
            width: 20%;
            margin-left: 20%;
            pointer-events: none;

            border-left: 2px dashed  ${props => getColorSettings(props.theme).accentuate};
            border-bottom: 2px dashed  ${props => getColorSettings(props.theme).accentuate};

            opacity: 0.4;
        }
    }

    &.selected {
        & .header{ 
            border-left: 4px solid ${props => getColorSettings(props.theme).accentuate};

            & .left{
                & svg {
                    background-color: ${props => getColorSettings(props.theme).accentuate};}
                }
        }

        & .action svg {
            transform: rotate(180deg);
        }
    }


    @media (max-width: ${SCREEN_SIZE.mobile}) {
        & .header {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 15px 10px;
            font-size: 12px;

            & .selected & .header{border-left: 4px solid transparent;}

            & .left {
                margin-right: 0px; 
                & span{display: none;}
            } 

            & .info {
                flex-direction: column;
                gap: 2px;
            }

            & .action {margin-left: 0;}
            &:hover {border-left: 4px solid transparent;}
        }

        & .content {
            &::after{border-left: 4px solid transparent;}
            & .card {width: 100%;}
             & .card::before {
                border-left: 2px dashed transparent;
                border-bottom: 2px dashed transparent;
            }
        }
    }
`;


export const CommandPromptWrapper = styled.div`
    display: flex;
    align-items: center;
    color: white;
    padding: 15px 20px;

    &::after {
        content: '_';
        color: white;
        margin-left: 5px;
        animation: ${blink} 1s step-end infinite;
    }
`;

export const ServicesListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 30px;

    span {
        color: #f0f0f0;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Separator = styled.span`margin: 0 5px;`;
export const LineTag = styled.span`font-weight: bold;`;
export const LineName = styled.span`font-weight: bold;`;
export const TerminalPath = styled.span`margin-right: 5px;`;
export const TerminalBody = styled.div`line-height: 1.5;`;
