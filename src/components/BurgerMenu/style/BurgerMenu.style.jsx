import styled from 'styled-components';
import { GetLightSetting } from '../../../config';

export const BurgerMenuContainer = styled.div`
	width: 30px;
	height: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;

	div {
		width: 100%;
		height: 2px;
		background-color: ${props => GetLightSetting(props.light).font};
		transition: all 0.3s ease;
	}

	&.open {
		div:first-child {transform: translateY(9px) rotate(45deg);}
		div:nth-child(2) {opacity: 0;}
		div:last-child {transform: translateY(-9px) rotate(-45deg);}
  	}
`;