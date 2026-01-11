import * as Styled from './style/Loader.style';
export const LoaderComponent = ({type, children}: {type: string, children?: React.ReactNode}) => {
    switch(type) {
        case 'loading':
            return (
                <Styled.LoaderWrapper>
                    <div className="loader">
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="loader-bar"></div>
                            ))
                        }
                    </div>
                 
                    {children && <Styled.LoadingText>{children}</Styled.LoadingText>}
                </Styled.LoaderWrapper>
            )
        case 'NoLoading':
            return (
                <Styled.LoaderWrapper>
                    <Styled.LoadingText>{children}</Styled.LoadingText>
                </Styled.LoaderWrapper>
            )
        default:
            return (
                <Styled.LoaderWrapper>
                    no type specified
                </Styled.LoaderWrapper>
            )
    }
}