import styled, {keyframes} from 'styled-components';
import { SCREEN_SIZE, getColorSettings, GetLightSetting } from '../../config.jsx';

export const Container = styled.div`
    padding: 30px 0;
    padding-top: 90px;
    margin-top: -60px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.5) 100%);  
    }

`;


export const LabelWorld = styled.input`
    font-size: .7em;
    font-weight: bold;
    font-variation-settings: "wght" 600;
    padding: 10px 15px;
    background: ${props => props.$backgroundCustom || 'transparent'};
    outline: transparent;
    color: white;


    &::placeholder{opacity: 0.9;}
    &&:hover, &&:focus{ border: 2px solid ${props => props.$borderColorCustom || 'black'};}
`

export const ButtonScroll = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`
export const Top = styled.div`
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 50px;
    width: 70%;
    z-index: 2;
    height: 100%;

    text-align: center;

    @media (max-width:  ${SCREEN_SIZE.mobile}) {
        width: 100%;
        height: 100%;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        text-align: center;

        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;

        padding: 20px;
        border-radius: 10px;

        
    }

    & h1{
        font-weight: bold;
        display: block;
        font-size: 3vw;
        margin-bottom: 30px;
        font-variation-settings: "wght" 500;
        line-height: 1.2em;

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            font-size: 8vw;
            width: 100%;
            line-height: 1.3em;
        }
   }

   & p{
        font-size: 2em;
        margin-bottom: 1em;
        margin-top: 2px;
        font-variation-settings: "wght" 150;

        & .other{
            display: block;
            font-variation-settings: "wght" 150;
            font-size: .7em;
            text-align: left;
            margin-top: 50px;
        }

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            font-size: 1.6em;
        }
   }

   .cta{
        display : flex;
        gap: 50px;

        justify-content: center;

        }

     	@media (max-width:  ${SCREEN_SIZE.mobile}) {
        .cta{
            flex-direction: column;
            gap: 20px;
            width: 100%;
        }
    }
`

export const Action = styled.div`
	max-width: 300px;
	border: 2px solid #ffffff21;
	border-radius: 10px;
	padding: 10px;
	cursor: pointer;
	transition: border 0.3s ease-in-out;
	border-bottom: 5px solid ${props => getColorSettings(props.theme).primary};
	background-color: #0a0a0a6a;
	margin: 0 auto;
	width: 100%;
	position: relative;
	overflow: hidden; 

	&.highlight {
			border: 2px solid ${props => getColorSettings(props.theme).primary};
			border-bottom: 5px solid ${props => getColorSettings(props.theme).primary};
			height: 100%;
		& .icon svg {
			background-color: ${props => getColorSettings(props.theme).primary};
		}
	}

	&:hover {
		border-style: inset;
		border: 2px solid ${props => getColorSettings(props.theme).primary};
		border-bottom: 5px solid ${props => getColorSettings(props.theme).primary};
	}

	&:hover::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 250px; 
		height: 250px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(
      circle,
      ${props => getColorSettings(props.theme).primary}40 0%,
      transparent 80%
		);
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
		pointer-events: none;
		z-index: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  & .icon {
    font-size: 2em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      font-variation-settings: "wght" 600;
      border: 2px solid ${props => getColorSettings(props.theme).primary};
      height: 50px;
      width: 50px;
      padding: 10px;
      border-radius: 25%;
      background-color: #111111;
      transition: background-color 0.3s;
    }
  }

  & h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
    font-variation-settings: "wght" 600;
    color: ${props => GetLightSetting(props.theme).font};
  }

  & p {
    font-size: 1em;
    font-variation-settings: "wght" 200;
    color: #cccccc;
    padding: 0 8px;
    text-align: center;
    justify-content: center;
  }
`;
