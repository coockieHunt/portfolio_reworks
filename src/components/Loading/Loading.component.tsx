import React from 'react';
import {
    Container,
    TopPanel,
    BottomPanel,
    Content,
} from './style/Loading.style';

export interface ILoadingProps {
    color?: string;
    duration?: number;
    text?: React.ReactNode;
}

export const Loading: React.FC<ILoadingProps> = ({
    color = '#1a1a1a',
    duration = 1000,
    text = 'CHANGEMENT DE THÈME',
}) => {
    return (
        <Container role="alert" aria-live="assertive" aria-busy="true">
            <TopPanel $color={color} $duration={duration} />

            <Content $duration={duration} $textColor="white">
                {text}
            </Content>

            <BottomPanel $color={color} $duration={duration} />
        </Container>
    );
};
