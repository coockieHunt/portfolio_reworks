import styled from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS, getColorSettings, GetLightSetting } from '../../config.jsx';

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
    font-weight: 200; 
    padding: 3px 15px;
    background: #1f1e1e;
	  border: 1px solid #ffffff21;
    outline: transparent;
    color: white;

    &::placeholder{
		opacity: .6; 
		color: #fffbfb;

    }
    &&:hover, &&:focus{ border: 2px solid ${props => getColorSettings(props.theme).primary};}
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
        padding: 20px;
        border-radius: ${BORDER_RADIUS.xlarge};
    }

    & h1{
        display: block;
        font-size: 3em;
        margin-bottom: 30px;
        font-weight: 500;
        line-height: 1.2em;
		    margin-top: 15px;

        @media (max-width:  ${SCREEN_SIZE.mobile}) {
            font-size: 8vw;
            width: 100%;
            line-height: 1.3em;
			margin-top: 20px;
        }
   }

   & p{
		font-size: 1.9em;
		margin-bottom: 3em;
		margin-top: 2px;
		font-weight: 200;


        & .other{
			display: block;
			font-size: .7em;
			text-align: left;
			margin-top: 50px;
			font-weight: 200;
        }

        @media (max-width:  ${SCREEN_SIZE.mobile}) {font-size: 1.6em;}
        @media (max-width:  ${SCREEN_SIZE.mobile}) { & .other{text-align: center; margin-top: 20px;}	}
   }

   .cta {
        display : flex;
        gap: 50px;
        justify-content: center;
        min-height: 250px; 
    }

	@media (max-width:  ${SCREEN_SIZE.mobile}) {
		.cta{
			flex-direction: column;
			gap: 20px;
			width: 100%;
            min-height: auto; 
		}
    }
`

export const Action = styled.div`
	max-width: 340px;
	min-width: 300px;
    height: 95%;

    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

	border: 2px solid #ffffff21;
	border-radius: ${BORDER_RADIUS.xlarge};
	padding: 15px 10px; 
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
		& .icon svg {background-color: ${props => getColorSettings(props.theme).primary};}
	}

	&:hover {
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
		border-radius: ${BORDER_RADIUS.round};
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
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  & .icon {
    font-size: 2em;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    & svg {
      border: 2px solid ${props => getColorSettings(props.theme).primary};
      height: 50px; 
      width: 50px;
      padding: 12px;
      border-radius: ${BORDER_RADIUS.icon};
      background-color: #111111;
      transition: background-color 0.3s;
    }
  }

  & h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: ${props => GetLightSetting(props.theme).font};
    z-index: 1;
  }

  & p {
    font-size: 1em;
    font-weight: 400; 
    color: #cccccc;
    padding: 0 5px;
    text-align: center;
    line-height: 1.4; 
    z-index: 1;
  }
`;