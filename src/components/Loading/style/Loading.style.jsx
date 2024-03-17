import styled, { keyframes, css } from 'styled-components';
import { GetLightSetting } from '../../../config';

const complete = keyframes`
    0% {
        transform: scale(1)
    }

    50% {
      transform: scale(400)
    }

    100% {
      transform: scale(1)
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
        position: fixed;
        border-radius: 50%;
        bottom: 0px;
        left: 0px; 

        height:10px;
        width:10px;

        transform-origin: center; 

        animation: ${({ loading }) =>
            loading
            ? css`
                  ${complete} 2s ease forwards
              `
            : 'none'};
    }

`;


