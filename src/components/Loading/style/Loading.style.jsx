import styled, { keyframes, css } from 'styled-components';

const complete = keyframes`
    0% { transform: scale(1); }
    25% { transform: scale(400); }
    75% { transform: scale(400); }
    100% { transform: scale(1); }
`;

export const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999999;

    & .frame{
        content: " ";
        background-color:  ${({ $color }) => $color || 'white'};
        position: fixed;
        border-radius: 50%;
        bottom: -150px;
        left: -150px; 

        height:100px;
        width:100px;

        transform-origin: center; 

        animation: ${({ loading, $duration }) => loading ? 
            css`${complete} ${$duration / 1000}s
            infinite cubic-bezier(0.83, 0, 0.17, 1)`
            : 'none'
        };
    }
`;


