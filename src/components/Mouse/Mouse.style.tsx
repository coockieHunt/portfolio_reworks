import styled, { keyframes, css } from 'styled-components';
import { SCREEN_SIZE } from '../../config.js';

export interface IMouseProps {
    $colorSettings: {
        primary: string;
    };
    $type: 'mouse' | 'phone';
}


const type_size = {
	mouse: {
		width: "60px",
		height: "100px",
		border: "100px",
		positonX: "20%",
		positonY: "50%"
	},

	phone: {
		width: "70px",
		height: "120px",
		border: "10px",
		positonX: "60%",
		positonY: "70%"
	}
}

const scrollWheelAnimation = keyframes`
	0% {transform: translate(-50%, -50%);}
	100% {transform: translate(-50%, 30%);}
`;

export const Mouse = styled.div<IMouseProps>`
    position: relative;
    width: ${type_size.mouse.width};
    height: ${type_size.mouse.height};
    border: 2px solid white;
    border-radius: ${type_size.mouse.border};

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: ${type_size.phone.width};
        height: ${type_size.phone.height};
        border-radius: ${type_size.phone.border};
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: ${type_size.mouse.positonX};
        left: ${type_size.mouse.positonY};
        transform: translate(-50%, 0);
        border: 2px solid var(--primary);
        border-radius: 100%;
        animation: ${scrollWheelAnimation} 1.4s infinite alternate ease-in-out;

        width: 10PX;
        height: 10PX;

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            top: ${type_size.phone.positonX};
            left: ${type_size.phone.positonY};
        }
}

@media (max-width: ${SCREEN_SIZE.mobile}) {
    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 15%;
        left: calc(100% + 4px);
        transform: translate(-50%, 0);
        border: 1px solid var(--primary);
        background-color: var(--primary);
        height: 15px;
        width: 1px;
        border-radius: 0 4px 4px 0;
    }
}
`;