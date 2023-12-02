import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING } from '../config';

console.log(props => props.theme)

const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: auto;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background:  ${props => COLOR_SETTING[props.theme.theme].background_accentuated};
  }

  *::-webkit-scrollbar-thumb {
    background-color:  ${props => COLOR_SETTING[props.theme.theme].primary};
    border-radius: 3px;
    border:0px;
  }

  body {
    background-color:  ${props => COLOR_SETTING[props.theme.theme].background};
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

  html,
  body {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
`

export const Content = styled.div`
`



export default GlobalStyle;