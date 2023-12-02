import styled from 'styled-components';
import { STYLE } from '../config/arrow';
import { getColorSettings } from '../../../config';

export const ArrowContainerFixed = styled.div`
    position: fixed;
    bottom: ${STYLE.position.bottom};
    right: ${STYLE.position.right};
    z-index: 20;

    width: 10px;
    height: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    background-color: ${props => getColorSettings(props.theme).primary};
    padding: 15px;
    border-radius: ${STYLE.border_radius};
    transform: rotate(-90deg);
    transition: all 0.3s ease;
    box-sizing: content-box;

	border: ${STYLE.border && "1px solid #ffffff68"};

    &:hover{
      box-shadow: 
	  	rgba(0, 0, 0, 0.17) 0px -5px 5px 0px inset, 
		rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
		rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
		rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, 
		rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, 
		rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
    div {
        width: 100%;
        height: 2px;
        background-color: #fff;
    }

    div:first-child {transform: translateY(1px) rotate(45deg);}

    div:last-child {transform: translateY(-1px) rotate(-45deg);}

    &.hide{right: ${STYLE.hide_offset};}
`

export const ArrowContainer = styled.div`
    width: 15px;
    height: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    background-color: ${props => getColorSettings(props.theme).primary};
    padding: 20px;
    transform: rotate(-90deg);
    transition: all 0.3s ease;
    box-sizing: content-box;


    &:hover{
      box-shadow: 
	  	rgba(0, 0, 0, 0.17) 0px -5px 5px 0px inset, 
		rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
		rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
		rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, 
		rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, 
		rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
    div {
        width: 100%;
        height: 2px;
        background-color: #fff;
    }

    div:first-child {transform: translateY(2px) rotate(45deg);}
    div:last-child {transform: translateY(-2px) rotate(-45deg);}
    &.hide{right: ${STYLE.hide_offset};}
`