import { useMemo, FC } from 'react';
import * as Styled from './Stack.style';
import { StackList, iStackItem } from '@/config';

interface BuildStackProps {
    data: iStackItem;
}

const BuildStack: FC<BuildStackProps> = ({ data }) => {
    const Icon = data.icon;

    return (
        <Styled.Stack $iconSize={data.width} $iconColor={data.color}>
            <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
            >
                <Icon 
                    width= {data.width}
                    height={data.width} 
                    style={{ color: data.color, fill: 'currentColor' }} 
                    className="icon"
                />
                <h3>{data.name}</h3>
            </a>
        </Styled.Stack>
    );
};

export const StackContainer: FC = () => {
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
};