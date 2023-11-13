import styled, { keyframes, css } from 'styled-components';
import { SCREEN_SIZE, COLOR } from '../../../config';

const type_size = {
  mouse : {
    width : "60px",
    height : "100px",
    border:  "100px",
    positonX: "20%",
    positonY: "50%"
  },

  phone : {
    width : "70px",
    height : "120px",
    border:  "10px",
    positonX: "60%",
    positonY: "70%"
  }
}

const scrollWheelAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, 30%);
  }
`;

export const Mouse = styled.div`
    position: relative;
    width: ${props => props.type == "mouse" ?  type_size.mouse.width : type_size.phone.width};
    height: ${props => props.type == "mouse" ?  type_size.mouse.height : type_size.phone.height};
    margin: 50px auto;
    border: 2px solid white;
    border-radius:  ${props => props.type == "mouse" ?  type_size.mouse.border : type_size.phone.border};

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: ${props => props.type == "mouse" ?  type_size.mouse.positonX : type_size.phone.positonX};
    left: ${props => props.type == "mouse" ?  type_size.mouse.positonY : type_size.phone.positonY};
    transform: translate(-50%, 0);
    border: 2px solid ${COLOR.primary};
    border-radius: 100%;
    animation: ${scrollWheelAnimation} 1.4s infinite alternate ease-in-out;

    width: 10PX;
    height: 10PX;
  }

  ${props => props.type !== "mouse" && css`
      &:before {
          content: '';
          display: block;
          position: absolute;
          top: 15%;
          left: calc(100% + 4px);
          transform: translate(-50%, 0);
          border: 1px solid ${COLOR.primary};
          background-color: ${COLOR.primary};
          height: 15px;
          width: 1px;
          border-radius: 0 4px 4px 0;
      }
  `}
`;