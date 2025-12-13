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
                color: #ccc;
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
export const InputWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
`;

export const LabelWorld = styled.input`
    font-size: .7em;
    font-weight: 200; 
    padding: 3px 10px;
    padding-right: 50px;
    background: #1f1e1e;
	border: 1px solid #ffffff21;
    outline: transparent;
    color: white;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

	&:not(:focus,:hover){
		border-bottom: 2px solid #ffffff21; 
		animation: ${BorderPulseLight} 2s infinite;
	}

    &::placeholder{
		opacity: 1; 
		color: #fffbfb;
    }

    &&:hover, &&:focus{ border: 2px solid ${props => getColorSettings(props.theme).primary};}
`;

export const SendIcon = styled.div`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => getColorSettings(props.theme).primary};
    font-size: 0.60em;
    cursor: pointer;
    pointer-events: auto;
    z-index: 10;
    padding: 10px;
	padding-left: 4px;
    border-radius: 2px;
    transition: transform 0.2s ease, color 0.2s ease;
    animation: ${ShowOutContainerRight} 0.3s ease-out;

    &:hover {
        transform: translateY(-50%) scale(1.15);
        color: ${props => getColorSettings(props.theme).accentuate};
    }

    &:active {transform: translateY(-50%) scale(0.95);}
`

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
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3); 

    &:hover {
        border-color: #ffffff;                
        transform: translateY(-2px);           
    }

    &.highlight {
        background-color: ${props => getColorSettings(props.theme).primary};
        border: 1px solid ${props => getColorSettings(props.theme).primary};
        color: #ffffff; 
        box-shadow: 0 0 15px ${props => getColorSettings(props.theme).primary}40;
        &:hover {background-color: ${props => getColorSettings(props.theme).primary}; }
    }

    & h2 {
        font-size: 1em;  
        font-weight: inherit;
        margin: 0;        
        pointer-events: none;
    }
`;
