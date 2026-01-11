import { GridEffect } from '@/styles/effect';
import * as Styled from './hero.style';

// Interface
interface IHeroContainerProps {
    children: React.ReactNode;
    $backgroundImg?: string;
    className?: string;
    [key: string]: any;
}

export const HeroContainer = ({
    children,
    $backgroundImg,
    className,
    ...rest
}: IHeroContainerProps) => {
    return (
        <>
            <GridEffect>
                <Styled.Container
                    $backgroundImg={$backgroundImg || ''}
                    className={className}
                    {...rest}
                >
                    {children}
                </Styled.Container>
            </GridEffect>
            <Styled.ShadowOverlay />
        </>
       
    );
};
