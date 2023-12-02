import styled, { keyframes } from 'styled-components';
import { getColorSettings } from '../../../config';

const Loop = keyframes`
  0% {transform: translateX(0);}
  100% {transform: translateX(-50%);}
`;

export const TagList = styled.div`
	max-width: 90vw;
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	gap: 1rem 0;
	position: relative;
	padding: 1.5rem 0;
	overflow: hidden;
`;

export const LoopSlider = styled.div`
	& .inner {
		display: flex;
		width: fit-content;
		animation-name: ${Loop};
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: var(--direction);
		animation-duration: var(--duration);
	}
`;

export const Tag = styled.div`
	display: flex;
	align-items: center;
	gap: 0 0.2rem;
	color: #e2e8f0;
	font-size: 1rem;
	background-color: ${props => getColorSettings(props.theme).primary};
	border-radius: 0.4rem;
	padding: 0.7rem 1rem;
	margin-right: 1rem;
	box-shadow: 
		0 0.1rem 0.2rem rgb(0 0 0 / 20%),
		0 0.1rem 0.5rem rgb(0 0 0 / 30%),
		0 0.2rem 1.5rem rgb(0 0 0 / 40%);

	span {
		font-size: 1.2rem;
		color: #919194;
	}
`;

export const Fade = styled.div`
	pointer-events: none;
	border-left: 1px solid ${props => getColorSettings(props.theme).primary};
	border-right: 1px solid ${props => getColorSettings(props.theme).primary};
	position: absolute;
	inset: 0;
`;
