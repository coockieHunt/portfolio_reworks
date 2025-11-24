import { useState, useCallback } from "react";

/**
 * Custom React hook for managing multiple modal dialogs.
 *
 * @returns {Object} An object containing:
 *   - {Array} modals: Array of modal objects ({ isOpen, title, content }).
 *   - {Function} openModal: Opens a new modal with the specified title and content.
 *     @param {string} title - The title of the modal.
 *     @param {React.ReactNode} content - The content to display inside the modal.
 *   - {Function} closeModal: Closes a modal at the specified index.
 *     @param {number} index - The index of the modal to close.
 *   - {Function} closeAllModals: Closes all open modals.
 */
export const UseModal = () => {
    const [modals, setModals] = useState([]);

    const openModal = useCallback((title, content) => {
        setModals(prev => [...prev, { isOpen: true, title, content }]);
    }, []);

    const closeModal = useCallback((index) => {
        setModals(prev => prev.filter((_, i) => i !== index));
    }, []);

    const closeAllModals = useCallback(() => {
        setModals([]);
    }, []);

    return {
        modals,
        openModal,
        closeModal,
        closeAllModals
    };
};
