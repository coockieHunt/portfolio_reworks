import { createPortal } from 'react-dom';
import * as Styled from "./style/LightBox.style.js";

interface ILightBoxProps {
    isLightBoxOpen: boolean;
    currentImg: string;
    closeLightBox: () => void;
}

export const LightBoxComponent = ({ isLightBoxOpen, currentImg, closeLightBox }: ILightBoxProps) => {
    if (!isLightBoxOpen) return null;

    return createPortal(
        <Styled.LightBoxContainer onClick={closeLightBox}>
            <img src={currentImg} alt="" onClick={(e) => e.stopPropagation()} />
            <Styled.CloseButton onClick={closeLightBox} aria-label="Fermer la lightbox">×</Styled.CloseButton>
        </Styled.LightBoxContainer>,
        document.body
    );
}