import styled from 'styled-components';
import { getColorSettings, GetLightSetting } from '../../../config';

export const  IconContainer = styled.button`
    position: relative;
    color: ${props => props.color ? props.color : getColorSettings(props.theme).primary};
    background-color: transparent;
    font-size: 1em;
    padding: 5px;
    transition: all .3s ease;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 1em;
    padding: 6px;
    
    &:hover{
        background-color: ${props => GetLightSetting(props.light).background_secondary};
        border-radius: 100%;
        transition: all .3s ease;
    }

    & span {
        opacity: 0;
        transition: all 0.3s ease-in-out;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(${props => props.$textX && props.$textX });
        white-space: nowrap; 
        font-weight: 500;
        user-select: none;
        pointer-events: none;
    }

  &:hover {
    span {
      opacity: 1;
      transform: translateX(${props => props.$textX && props.$textX}) translateY(${props => props.$textY && props.$textY});
    }
  }
`