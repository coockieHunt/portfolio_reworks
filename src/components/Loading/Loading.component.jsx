import React from 'react';
import { Container, TopPanel, BottomPanel, Content } from './style/Loading.style';

export const Loading = ({ $color, $duration, text = "CHANGEMENT DE THÈME" }) => {
    return (
        <Container>
            <TopPanel $color={$color} $duration={$duration} />
            
            <Content $duration={$duration} $textColor={"white" /* Ou dynamique */}>
                {text}
            </Content>
            
            <BottomPanel $color={$color} $duration={$duration} />
        </Container>
    );
};