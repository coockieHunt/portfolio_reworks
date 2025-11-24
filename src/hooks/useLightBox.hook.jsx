
import { useState, useCallback } from "react";

/**
 * Custom React hook to manage a lightbox component's open state and current image.
 *
 * @returns {Object} An object containing:
 *   - {boolean} isLightBoxOpen - Indicates if the lightbox is open.
 *   - {string|null} currentImg - The URL of the currently displayed image, or null if none.
 *   - {function} ChangeLightBoxImg - Function to change the current image in the lightbox.
 *   - {function} ToggleLightBox - Function to toggle the lightbox's open state.
 */
export const UseLightBox = () => {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);

    const ChangeLightBoxImg = useCallback((imgUrl) => {
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
