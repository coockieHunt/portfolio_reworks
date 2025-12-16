import styled from 'styled-components';
import { SCREEN_SIZE, getColorSettings } from '../../config';
import { BorderPulseLight, ShowOutContainerRight } from '../../styles/utils.style';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: relative;

    & .mouse{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 48px; 
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 5;
    }
    
    & .split{
        height: 85%;          
        width: 95%;
        display: flex;
        align-items: center;     
        margin: 0 auto;

        & .text, & .cube {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center; 
        }

        & .text {
            align-items: flex-start; 
            text-align: left;        
            padding-left: 10%;       
            padding-right: 20px;     

            & h1 {
                font-size: 3.5em;
                margin-bottom: 20px;
                font-weight: 700;
                line-height: 1.2; 
                
                display: inline-block; 
                width: 100%;
            }

            & p {
                font-size: 1.3em;
                line-height: 1.6;
                max-width: 550px; 
                color: ${props => getColorSettings(props.theme).font_subtle};
                margin-bottom: 40px;
            }

            & .cta {
                display: flex;
                gap: 20px; 
                flex-wrap: wrap;
            }
        }

        & .cube {
            align-items: center;
            justify-content: center;
            position: relative;
            & .scene {
                width: 90%;
                height: 70%;
            }
        }

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            flex: none;
            width: 100%;

            & .text{
                width: 100%;
                padding: 0 35px; 
                justify-content: flex-start; 
                
                & h1 {
                    font-size: 2em;
                }

                & p {
                    font-size: 1em;
                    max-width: 100%;
                }
            }

            & .cube{
                pointer-events: none;
                z-index: -1;
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.2;

                & .scene {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        margin-top: 0; 
        padding-top: 100px; 
        padding-bottom: 50px;
        height: auto;       

        & .mouse{
            position: relative;
            margin-top: 40px;
            bottom: auto;
            left: auto;
            transform: scale(0.8);
            margin-bottom: 20px;
        }
    }

    //no display on very small screens (S8, Iphone SE)
    @media (max-width: 400px) {
        & .mouse{
            display: none;
        }
    }
`;

export const ButtonScroll = styled.div`
    display: flex;
    align-items: center;
`
export const Top = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Action = styled.div`
    display: inline-flex;     
    align-items: center;
    justify-content: center;
    padding: 12px 28px;        
    margin-right: 15px;         
    
    font-weight: 600;          
    font-size: 1rem;            

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3); 

    &:hover {
        transform: translateY(-2px);           
    }

    &.highlight {
        background-color: ${props => getColorSettings(props.theme).primary};
        border: 1px solid ${props => getColorSettings(props.theme).primary};
        box-shadow: 0 0 15px ${props => getColorSettings(props.theme).primary}40;
        color: ${props => getColorSettings(props.theme).font_on_primary};
        &:hover {background-color: ${props => getColorSettings(props.theme).primary}; }
    }

    & h2 {
        font-size: 1em;  
        font-weight: inherit;
        margin: 0;        
        pointer-events: none;
    }
`;
