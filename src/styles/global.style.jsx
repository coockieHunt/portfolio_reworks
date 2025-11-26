import { createGlobalStyle, styled } from 'styled-components';
import { COLOR_SETTING, LIGHT_SETTING } from '../config';

const GlobalStyle = createGlobalStyle`
	*::-webkit-scrollbar {width: 10px;}
	*::-webkit-scrollbar-track {background:  ${props => LIGHT_SETTING[props.theme.light].background_accentuated};}
	* {scrollbar-width: auto;box-sizing: border-box;}

	*::-webkit-scrollbar-thumb {
		background-color:  ${props => COLOR_SETTING[props.theme.theme].primary};
		border-radius: 3px;
		border:0px;
	}

	* {
		transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
	}

	body {
		background-color: black;
		background-repeat: no-repeat;
		background-attachment: fixed;
		color: white;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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

	.font_code {
		font-family: "Source Code Pro", monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
	}

	html {
		overflow-x: hidden;
		overflow-y: auto;
		height: 100vh;
		width: 100%;
	}

	body {
		overflow-x: hidden;
		overflow-y: visible;
		min-height: 100vh;
		width: 100%;
	}
`

export const Content = styled.div``
export default GlobalStyle;