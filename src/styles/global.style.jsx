import { createGlobalStyle, styled } from 'styled-components';
import { COLOR } from '../config';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('/Montserrat-VariableFont_wght.ttf') format('truetype'); 
  }

  * {
    scrollbar-width: auto;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${COLOR.background};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${COLOR.primary};
    border-radius: 3px;
    border:0px;
  }

  body {
    background-color: ${COLOR.background};
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1em;
    font-weight: normal;
    font-style: normal;
    text-decoration: none; 
    font-family: 'Montserrat', sans-serif;
  }

  html{
    scroll-behavior: smooth;
  }
`;


export const Content = styled.div`
`

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1em;
    font-size: 5vw;
    height: 100vh;
    position: relative;

    overflow: hidden;

    & span {
        color: ${COLOR.primary};
        font-variation-settings: "wght" 700;
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        z-index: 2; 
    }

    & .loader {
      position: relative; 
      z-index: 1; 
      top: 0; 
      left: 0; 
      transform: translate(-50%, -50%); 
    }
`;

export default GlobalStyle;