import { useState, useCallback } from "react";

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
