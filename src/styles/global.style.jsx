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

export default GlobalStyle;