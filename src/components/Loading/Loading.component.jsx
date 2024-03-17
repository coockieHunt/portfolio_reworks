import {Container } from './style/Loading.style';

export const Loading = ({loading, color}) => {
    return (
        <Container loading={loading ? 1 : 0} color={color}>
            <div className="frame"/>
        </Container>
    );
};
