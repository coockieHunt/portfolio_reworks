import styled from 'styled-components';
import { getColorSettings } from '../../config';

const Panel_width = "150px"

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 10;

    bottom: 50vh;
    right: 0;
    width: 200px;
    
    display: flex;
    justify-content: space-between;
    align-items: start;

    transform: translate(0, 50%);
    transition: transform 0.3s ease-in-out;

    &.close{
        transform: translate( ${Panel_width}, 50%);
        transition: transform 0.3s ease-in-out;
    }
`

export const Icon = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Action = styled.div`
    position: relative;
    z-index: 9;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => getColorSettings(props.theme).primary};
    cursor: pointer;

    border: 1px solid ${props => getColorSettings(props.theme).border};
    opacity: 1;

    right: 0;
    transition: right .5s ease-in-out, opacity 0.2s ease-in-out;

    &:hover{
      box-shadow: 
	  	rgba(0, 0, 0, 0.17) 0px -5px 5px 0px inset, 
		rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
		rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
		rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, 
		rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, 
		rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }

    &.hide{ 
        transition: right .5s ease-in-out, opacity 0.5s ease-in-out;
        opacity: 0;
        right: -200px;
    }
`

export const Option = styled.div`
    width: ${Panel_width};
    background-color: ${props => getColorSettings(props.theme).primary};;
    padding: 25px 15px;
    border-radius: 5px 0 0 5px;
    display: flex;
    flex-direction: column;

    & .ContainerButton{
        display: flex;
        gap: 5px;
        flex-wrap: nowrap;
    }
`

export const Title = styled.span`
    font-variation-settings: "wght" 600;
    /* color: ${props => getColorSettings(props.theme).primary}; */
    padding: 0 0 15px 0;

    display: flex;
    align-items: center;
    gap: 10px;
`

export const ButtonColor = styled.button`
    width: 20px;
    height: 20px;
    content: "";
    border: 1px solid white;
    flex: 1;
`

export const OptionsList = styled.div`
    display: flex;
    flex-direction: column;

    gap: 10px;
`