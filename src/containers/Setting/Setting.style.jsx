import styled from 'styled-components';
import { getColorSettings } from '../../config.jsx';

export const ContainerSetting = styled.div`
    position: fixed;
    z-index: 10;
    color: white;

    bottom: 50vh;
    right: 0;
    
    display: flex;
    transform: translateX(0%);
    transition: transform .5s ease-in-out;

    &.close{transform: translateX(100%);}
`

export const Toggle = styled.div``

export const Action = styled.div`

    position: relative;
    z-index: 9;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${props => getColorSettings(props.theme).primary};
    cursor: pointer;

    border: 1px solid ${props => getColorSettings(props.theme).border};
    opacity: 1;

    right: 0;
    transition: all .5s ease-in-out, opacity 0.2s ease-in-out;

    &:hover{opacity: 0.8;}
`

export const Title = styled.span`
  font-size: 1.2em;
  position: absolute;
  right: calc(200% + 20px);
  top: 50%;
  font-variation-settings: "wght" 300;
  transform-origin: right top;
  transform: rotate(-90deg);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  height: 40px;
  color: ${props => getColorSettings(props.theme).font};

  & > span {
    display: flex;
    align-items: center;
    gap: 5px;

    & svg {margin-top: 5px;}
  }
`;

export const Option = styled.div`
    background-color: ${props => getColorSettings(props.theme).primary};;
    padding: 15px 15px; 
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    & .ContainerButton{
        display: flex;
        flex-direction: column;

        gap: 10px;
    }
`

export const TitleOption = styled.h3`
    font-variation-settings: "wght" 700;
    margin: 0;
    margin-bottom: 10px;
`

export const ButtonColor = styled.button`
    width: 20px;
    height: 20px;
    content: "";
    border: 1px solid white;
    flex: 1;
    cursor: pointer;

    gap: 10px;

    &:hover{opacity: 0.8;}
`

export const OptionsList = styled.div`
    display: flex;
    flex-direction: column;

    gap: 10px;
`

export const RoudedButtonColor = styled.span`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: linear-gradient(to left, ${props => props.$primary}  50%, ${props => props.$secondary} 50%);
    cursor: pointer;
    
    &.current{border: 1px solid white;}

    &::after{
        content: "${props => props.display}";
        padding-left: 35px;
    }
` 