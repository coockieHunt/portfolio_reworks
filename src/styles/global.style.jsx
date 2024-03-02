import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING, LIGHT_SETTING } from '../config';

const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: auto;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background:  ${props => LIGHT_SETTING[props.theme.light].background_accentuated};
  }

  *::-webkit-scrollbar-thumb {
    background-color:  ${props => COLOR_SETTING[props.theme.theme].primary};
    border-radius: 3px;
    border:0px;
  }

  body {
    background-color: ${props => LIGHT_SETTING[props.theme.light].background};
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${props => LIGHT_SETTING[props.theme.light].font};
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