import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING } from '../config';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Montserrat-Fallback";
        size-adjust: 105%;   
        ascent-override: 95%;
        src: local("Arial");  
        font-display: swap; 
    }

    /* gloabl wraper */
    .font_code {
        font-family: "Source Code Pro", monospace;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
        font-style: normal;
        font-family: 'Montserrat', 'Montserrat-Fallback', sans-serif;
    }

    *::-webkit-scrollbar {
        width: 10px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${props => COLOR_SETTING[props.theme.theme]?.primary || '#6A5ACD'};
        border-radius: 3px;
    }

    html {
        scrollbar-width: thin;
        scrollbar-color: ${props => COLOR_SETTING[props.theme.theme]?.primary || '#6A5ACD'} #121212;
        width: 100%;
        scroll-behavior: smooth;
    }

    body {
        background-color: #121212;
        color: ${props => COLOR_SETTING[props.theme.theme]?.font || '#FFFFFF'};
        font-family: 'Montserrat', 'Montserrat-Fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 100%;
        line-height: 1.5;
        font-weight: 400;
        
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        overflow-x: hidden;
        min-height: 100vh;
        width: 100%;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input, textarea {
        color: ${props => COLOR_SETTING[props.theme.theme]?.font || '#FFFFFF'};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
        -webkit-text-fill-color: ${props => COLOR_SETTING[props.theme.theme]?.font || '#FFFFFF'};
        -webkit-box-shadow: none !important;
        caret-color: ${props => COLOR_SETTING[props.theme.theme]?.font || '#FFFFFF'};
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
`;

export default GlobalStyle;