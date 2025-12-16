// React
import React from 'react';

// styles
import * as styled from './[FTName].style';

// Types
interface [FTName]ContainerProps {
	id?: string;
}

export const [FTName]Container: React.FC<[FTName]ContainerProps>  = ({ id }) => {
	return (
		<styled.Container id={id}>
			[FTName] Container imported!
		</styled.Container>
	);
};

