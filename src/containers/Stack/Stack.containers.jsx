import {useMemo} from 'react';
import * as Styled from './Stack.style';
import { StackList } from '../../config.jsx';

const BuildStack = ({ data }) => {
    return (
        <Styled.Stack $iconSize={data.width} $iconColor={data.color} >
			<a href={data.link} target="_blank" rel="noopener noreferrer" tabIndex="-1">
				<div className="icon">
					{data.icon}
				</div>
				<h3>{data.name}</h3>
			</a>
        </Styled.Stack>
    )
}

export const StackContainer = () => {
	const infiniteStack = useMemo(() => Array(4).fill(StackList).flat(), []);

 	return (
        <Styled.Container>
            <Styled.Track>
                {infiniteStack.map((item, index) => (
                    <BuildStack key={`${item.name}-${index}`} data={item} />
                ))}
            </Styled.Track>
        </Styled.Container>
    );
}