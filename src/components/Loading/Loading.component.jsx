import { Container } from './style/Loading.style';

export const Loading = ({ $color, $duration = 4 }) => {
    return (
        <Container loading={1} $color={$color} $duration={$duration}>
            <div className="frame" />
        </Container>
    );
};