import styled, { keyframes, css } from 'styled-components';
import { GetLightSetting } from '../../../config';

const fade = keyframes`
 0% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const complete = keyframes`
    0% {
        width: 0px;
        height: 0px;
        border-radius: 50%;
        bottom: calc(50% - 50px);
        left: calc(50% - 50px); 
    }

    50% {
        width: 200vw;
        height: 200vw;
        bottom: calc(50% - 100vw);
        left: calc(50% - 100vw); 
    }

    100% {
        width: 0px;
        height: 0px;
        border-radius: 50%;
        bottom: calc(50% - 50px); 
        left: calc(50% - 50px);
    }
`;

export const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999999;

    & .frame{
        content: " ";
        background-color:  ${({ color }) => color || 'white'};

        position: absolute;
        border-radius: 50%;

        animation: ${({ loading }) =>
            loading
            ? css`
                  ${complete} 1s ease forwards
              `
            : 'none'};
    }

`;


