import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING, HightContrastColorSetting } from '../config';

const GlobalStyle = createGlobalStyle`
    /* Font declarations with fallback to optimize CLS */
    @font-face {
        font-family: 'Doto Variable';
        font-display: fallback;
        font-weight: 100 900;
        font-stretch: 75% 100%;
    }

    @font-face {
        font-family: 'Montserrat';
        font-display: fallback;
        font-weight: 100 900;
        font-stretch: 75% 100%;
    }

    @font-face {
        font-family: 'Source Code Pro';
        font-display: fallback;
        font-weight: 200 700;
    }

    :root {
        --background: ${(props) => COLOR_SETTING[props.theme.theme]?.background || '#121212'};
        --background-secondary: ${(props) => COLOR_SETTING[props.theme.theme]?.background_secondary || '#0d0d0d'};
        --background-color: ${(props) => COLOR_SETTING[props.theme.theme]?.background_color || '#342c72'};
        --background-elevated: ${(props) => COLOR_SETTING[props.theme.theme]?.background_elevated || '#15111f'};
        
        --font: ${(props) => COLOR_SETTING[props.theme.theme]?.font || '#ddd9f7'};
        --font-subtle: ${(props) => COLOR_SETTING[props.theme.theme]?.font_subtle || 'rgba(255, 255, 255, 0.75)'};
        --font-on-primary: ${(props) => COLOR_SETTING[props.theme.theme]?.font_on_primary || '#ffffff'};
        --font-hint: ${(props) => COLOR_SETTING[props.theme.theme]?.font_hint || '#bbbbcc'};

        --primary: ${(props) => COLOR_SETTING[props.theme.theme]?.primary || '#8C7DFF'};
        --secondary: ${(props) => COLOR_SETTING[props.theme.theme]?.secondary || '#4F4398'};
        --accentuate: ${(props) => COLOR_SETTING[props.theme.theme]?.accentuate || '#A594FF'};

        --succes: ${(props) => COLOR_SETTING[props.theme.theme]?.succes || '#4CAF50'};
        --error: ${(props) => COLOR_SETTING[props.theme.theme]?.error || '#F44336'};
        --warning: ${(props) => COLOR_SETTING[props.theme.theme]?.warning || '#FF9800'};
        --info: ${(props) => COLOR_SETTING[props.theme.theme]?.info || '#2196F3'};
        
        --border: ${(props) => COLOR_SETTING[props.theme.theme]?.border || 'rgba(255, 255, 255, 0.12)'};
        --border-light: ${(props) => COLOR_SETTING[props.theme.theme]?.border_light || '#A594FF'};
        --border-dark: ${(props) => COLOR_SETTING[props.theme.theme]?.border_dark || '#6B5BA8'};
        --border-subtle: ${(props) => COLOR_SETTING[props.theme.theme]?.border_subtle || 'color-mix(in srgb, var(--primary), transparent 90%)'};
    }


    /* gloabl wraper */
    .font_code {
        font-family: "Source Code Pro", monospace;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    .font_dot{
        font-family: 'Doto Variable', sans-serif;
        font-weight: 300;
        font-optical-sizing: auto;
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
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        background-color: #121212;
        color: var(--font);
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 100%;
        line-height: 1.5;
        font-weight: 400;
        
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        overflow-x: hidden;
        min-height: 100vh;
        width: 100%;
        
        /* Prevent layout shifts by maintaining consistent line-height and font metrics */
        font-optical-sizing: auto;
    }


    a {
        text-decoration: none;
        color: inherit;
        text-decoration: none; 
    }

    /* Consistent text styling to prevent CLS from font loading */
    h1, h2, h3, h4, h5, h6 {
        line-height: 1.2;
        font-weight: 600;
    }

    p, li, span, div {
        line-height: inherit;
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

    ${(props) => {
        const hcConfig = HightContrastColorSetting;

        return `
            body.high-contrast {

                // reset
                &, & * {
                    background-image: linear-gradient(transparent, transparent) !important;
                    box-shadow: none !important;
                    text-shadow: none !important;

                }

                & svg {
                    stroke-width: ${COLOR_SETTING.HighContrast.custom.svg_stroke} !important;
                    stroke: ${COLOR_SETTING.HighContrast.custom.svg_stroke_color} !important; 
                }

                & h1, & h2, & h3 {
                    color: ${COLOR_SETTING.HighContrast.custom.text_color} !important;
                    margin: ${COLOR_SETTING.HighContrast.custom.margin_title} !important;
                    line-height: ${COLOR_SETTING.HighContrast.custom.title_line} !important;
                }

                & h1 { font-size: 2.5rem !important; font-weight: 700 !important; }
                & h2 { font-size: 2rem !important; font-weight: 700 !important; }
                & h3 { font-size: 1.5rem !important; font-weight: 600 !important; }
                
                & p, & li, & a, & div, & input, & textarea, & button {
                    font-weight: ${COLOR_SETTING.HighContrast.custom.basic_text_weight} !important;
                    color: ${COLOR_SETTING.HighContrast.custom.text_color} !important;
                    font-size: ${COLOR_SETTING.HighContrast.custom.basic_text_size} !important;
                }

                & nav, & header, & footer, & section, & main {
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
                    color: ${COLOR_SETTING.HighContrast.custom.text_color} !important;

                    &::placeholder {
                        color: ${COLOR_SETTING.HighContrast.custom.text_color_placeHolder} !important;
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
                    color: ${COLOR_SETTING.HighContrast.custom.text_color} !important;
                }

                & a{
                    color: ${COLOR_SETTING.HighContrast.custom.link_color} !important;
                }

               
               
                article {
                    border: 2px solid ${COLOR_SETTING.HighContrast.custom.link_color} !important;
                    & h2 {
                        color: ${COLOR_SETTING.HighContrast.custom.text_color} !2986ff;
                    }
                }

               #project {
                    
                    ul {
                        & .cta{
                            border: 2px solid green!important;
                        }
                        & li {
                            border: 2px solid ${COLOR_SETTING.HighContrast.custom.link_color} !important;
                            
                        }

                      
                    }
                }


                #toc {
                    li{
                        border: 2px solid ${COLOR_SETTING.HighContrast.custom.link_color} !important;
                        &.active {
                            background-color: ${COLOR_SETTING.HighContrast.custom.link_color_select} !important;
                        }
                        & :hover {
                            border: 2px solid ${COLOR_SETTING.HighContrast.custom.link_color_select} !important;
                        }
                    }
                }
                    
             
                .Modal {
                    border: 2px solid ${COLOR_SETTING.HighContrast.custom.link_color} !important;
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
