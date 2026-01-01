import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING, GetHightContrastSetting } from '../config';

const GlobalStyle = createGlobalStyle`
    :root {
        --background: ${props => COLOR_SETTING[props.theme.theme]?.background || '#303134'};
        --background-secondary: ${props => COLOR_SETTING[props.theme.theme]?.background_secondary || '#221f30'};
        --background-tertiary: ${props => COLOR_SETTING[props.theme.theme]?.background_tertiary || '#1c1933'};
        
        --font: ${props => COLOR_SETTING[props.theme.theme]?.font || '#ddd9f7'};
        --font-subtle: ${props => COLOR_SETTING[props.theme.theme]?.font_subtle || '#eeebffc0'};
        --font-on-primary: ${props => COLOR_SETTING[props.theme.theme]?.font_on_primary || '#ffffff'};
        --font-hint: ${props => COLOR_SETTING[props.theme.theme]?.font_hint || '#bbbbcc'};

        --primary: ${props => COLOR_SETTING[props.theme.theme]?.primary || '#8C7DFF'};
        --secondary: ${props => COLOR_SETTING[props.theme.theme]?.secondary || '#4F4398'};
        --accentuate: ${props => COLOR_SETTING[props.theme.theme]?.accentuate || '#A594FF'};
        
        --border: ${props => COLOR_SETTING[props.theme.theme]?.border || 'rgba(255, 255, 255, 0.12)'};
    }

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
        /* font-family: 'Montserrat', 'Montserrat-Fallback', sans-serif; */
    }

    *::-webkit-scrollbar {
        width: 10px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: var(--primary);
        border-radius: 3px;
    }

    html {
        scrollbar-width: thin;
        scrollbar-color: var(--primary) #121212;
        width: 100%;
    }

    body {
        background-color: #121212;
        color: var(--font);
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
        color: var(--font);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--font);
        -webkit-box-shadow: none !important;
        caret-color: var(--font);
    }

    button {
        border: none;
        font: inherit;
        color: inherit;
        outline: none;
        cursor: pointer;
    }

    svg {
        stroke-width: 1.5px; 
        transition: stroke-width 0.2s ease-in-out;
    }

    ${props => {
        const hcConfig = GetHightContrastSetting(props.theme.theme);

        return `
            body.high-contrast {

                // reset
                &, & * {
                    background-image: linear-gradient(transparent, transparent) !important;
                    box-shadow: none !important;
                    text-shadow: none !important;

                }

                & svg {
                    stroke-width: 2.5px !important;
                }

                & h1, & h2, & h3 {
                    color: white !important;
                    margin-bottom: 1rem !important;
                    line-height: 1.3 !important;
                }

                & h1 { font-size: 2.5rem !important; font-weight: 700 !important; }
                & h2 { font-size: 2rem !important; font-weight: 700 !important; }
                & h3 { font-size: 1.5rem !important; font-weight: 600 !important; }
                
                & p, & li, & a, & div, & input, & textarea, & button {
                    font-weight: 600 !important;
                    color: white!important;
                }

                & nav, & header, & footer, & section, & article, & main {
                    & a {
                        text-decoration: underline !important;
                        border: none !important;
                    }
                    background-color: black !important;
                    border: 2px solid white !important;
                }

                & input, & textarea, & select, & button {
                    border: 2px solid white !important;
                    background-color: black !important;
                    color: #fdfbfb !important;

                    &::placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }
                }

                
                & *::after, & *::before {
                    box-shadow: none !important;
                    filter: none !important;
                }

                & * .highlight {
                    background-color: black !important;
                }

                & .BackSubtitle {
                    display: none !important;
                }

                & div svg{
                    color: #faf5f5!important;
                }

                & div span{
                    color: #85fa00!important;
                    font-weight: 700!important;
                    font-shadow: 0 0 5px #0c4601!important;
                    
                }

                & Button, & a {
                    background-color: black !important;
                    color: #ffffff !important;
                    border: 2px solid white !important;
                }

                //highlight tab
                & *:focus-visible {
                    outline: 3px solid #ff0000 !important; 
                    outline-offset: 2px;
                    box-shadow: 0 0 10px #ff0000 !important; 
                }

                //specific fixes

                & #services{
                    & a{
                        display: inline-block !important;
                    }
                }
                
                & #product{
                    & :after, & :before {
                        display: none !important;
                    }
                }

                & #contact{
                    & .ItemInfo{
                        & svg{
                            color: #050505!important;
                        }
                    }
                }
            }
        `;
    }}
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
`;

export default GlobalStyle;