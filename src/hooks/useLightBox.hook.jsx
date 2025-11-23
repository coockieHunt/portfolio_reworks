import { useState, useCallback } from "react";

export const UseLightBox = () => {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);

    const ChangeLightBoxImg = useCallback((imgUrl) => {
        console.log("ChangeLightBoxImg", imgUrl);
        setCurrentImg(imgUrl);
    }, []);

    const ToggleLightBox = useCallback(() => {
        setIsLightBoxOpen(!isLightBoxOpen);
    }, [isLightBoxOpen]);

    return {
        isLightBoxOpen,
        currentImg,
        ChangeLightBoxImg,
        ToggleLightBox
    };
}
