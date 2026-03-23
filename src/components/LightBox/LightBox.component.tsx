import { createPortal } from 'react-dom';
import { BackDrop } from '@/styles/effect';
import * as Styled from './LightBox.style.js';

interface ILightBoxProps {
    isLightBoxOpen: boolean;
    currentImg: string | null;
    altText?: string;
    closeLightBox: () => void;
}

export const LightBoxComponent = ({
    isLightBoxOpen,
    currentImg,
    altText,
    closeLightBox,
}: ILightBoxProps) => {
    if (!isLightBoxOpen || !currentImg) return null;

    return createPortal(
        <>
            <BackDrop $isOpen={isLightBoxOpen} onClick={closeLightBox} />
            <Styled.LightBoxContainer onClick={closeLightBox}>
                <Styled.ImageWrapper onClick={(e) => e.stopPropagation()}>
                    {altText && <Styled.AltText>{altText}</Styled.AltText>}
                    <img src={currentImg} alt={altText || ''} />
                </Styled.ImageWrapper>
                <Styled.CloseButton
                    onClick={closeLightBox}
                    aria-label="Fermer la lightbox"
                >
                    ×
                </Styled.CloseButton>
            </Styled.LightBoxContainer>
        </>,
        document.body,
    );
};
