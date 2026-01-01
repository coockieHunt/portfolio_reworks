import { GridEffect } from '@/styles/effect';
import * as Styled from './hero.style';

interface IHeroContainerProps {
    children: React.ReactNode,
    $backgroundImg?: string,
    className?: string,
}


export const HeroContainer = ({children, $backgroundImg, className}: IHeroContainerProps) => {
    return (
        <GridEffect>
            <Styled.Container
                backgroundImg={$backgroundImg ? $backgroundImg : ''}
                className={className ? className : ''}
            >
                    {children}
            </Styled.Container>
        </GridEffect>
    );
}