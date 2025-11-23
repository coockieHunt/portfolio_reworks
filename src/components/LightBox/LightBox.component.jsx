import { createPortal } from 'react-dom';
import * as Styled from "./style/LightBox.style.jsx";

export const LightBoxComponent = ({ isLightBoxOpen, currentImg, closeLightBox }) => {
    if (!isLightBoxOpen) return null;

    return createPortal(
        <Styled.LightBoxContainer onClick={closeLightBox}>
            <img src={currentImg} alt="" onClick={(e) => e.stopPropagation()} />
            <Styled.CloseButton onClick={closeLightBox} aria-label="Fermer la lightbox">×</Styled.CloseButton>
        </Styled.LightBoxContainer>,
        document.body
    );
}