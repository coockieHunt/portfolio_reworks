import { useState, useCallback } from 'react';
import { useScrollbar } from './useScrollBar.hook';

import { IUseLightBox } from './interface/useLightBox.interface';

/**
 * Custom React hook to manage the state and behavior of a LightBox component.
 *
 * @returns {Object} An object containing:
 *   - {boolean} isLightBoxOpen - Indicates if the LightBox is currently open.
 *   - {string|null} currentImg - The URL of the currently displayed image in the LightBox.
 *   - {function} ChangeLightBoxImg - Function to change the currently displayed image.
 *   - {function} ToggleLightBox - Function to toggle the LightBox open/closed state.
 *
 * @example
 * const {
 *   isLightBoxOpen,
 *   currentImg,
 *   ChangeLightBoxImg,
 *   ToggleLightBox
 * } = UseLightBox();
 */
export const UseLightBox = (): IUseLightBox => {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const [currentAlt, setCurrentAlt] = useState('');

    useScrollbar(isLightBoxOpen);

    const ChangeLightBoxImg = useCallback((imgUrl, altText = '') => {
        setCurrentImg(imgUrl);
        setCurrentAlt(altText);
    }, []);

    const ToggleLightBox = useCallback(() => {
        setIsLightBoxOpen(!isLightBoxOpen);
    }, [isLightBoxOpen]);

    return {
        isLightBoxOpen,
        currentImg,
        currentAlt,
        ChangeLightBoxImg,
        ToggleLightBox,
    };
};
