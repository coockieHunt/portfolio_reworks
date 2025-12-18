import styled from 'styled-components';
import { GetHightContrastSetting } from '../config';

interface IGridEffectProps {
	$bigColor?: string;
	$smallColor?: string;
	$bigSize?: string;
	$smallSize?: string;
	$bigOffset?: string;
	$smallOffset?: string;
}

interface IDotGridEffectProps {
	$DotColor?: string;
	$DotSize?: string;
	$Spacing?: string;
	$offsetX?: string;
	$offsetY?: string;
	$isHovered?: boolean;
}

export const GridEffect = styled.div<IGridEffectProps>`
	background-image: 
		linear-gradient(${props => props.$bigColor || '#38373753'} 2px, transparent 2px), 
		linear-gradient(90deg, ${props => props.$bigColor || '#38373753'} 2px, transparent 2px),
		linear-gradient(${props => props.$smallColor || '#38373753'} 1px, transparent 1px), 
		linear-gradient(90deg, ${props => props.$smallColor || '#38373753'} 1px, transparent 1px);

	background-size: 
		${props => props.$bigSize || '100px'} ${props => props.$bigSize || '100px'}, 
		${props => props.$bigSize || '100px'} ${props => props.$bigSize || '100px'}, 
		${props => props.$smallSize || '20px'} ${props => props.$smallSize || '20px'},    
		${props => props.$smallSize || '20px'} ${props => props.$smallSize || '20px'};

	background-position: 
		${props => props.$bigOffset || '-2px'} ${props => props.$bigOffset || '-2px'}, 
		${props => props.$bigOffset || '-2px'} ${props => props.$bigOffset || '-2px'}, 
		${props => props.$smallOffset || '-1px'} ${props => props.$smallOffset || '-1px'}, 
		${props => props.$smallOffset || '-1px'} ${props => props.$smallOffset || '-1px'};
`;

export const DotGridEffect = styled.div<IDotGridEffectProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;

	background-image: radial-gradient(
		circle,
			${props => props.$DotColor || '#383737'} ${props => props.$DotSize || '2px'},
			transparent ${props => props.$DotSize || '2px'}
		);
	background-size: ${props => props.$Spacing || '20px'} ${props => props.$Spacing || '20px'};
	background-position: ${props => props.$offsetX || '0'} ${props => props.$offsetY || '0'};

	opacity: ${props => (props.$isHovered ? 1 : 0)};
	transition: opacity 0.5s ease-in-out;

	mix-blend-mode: overlay;
	pointer-events: none; 
`;