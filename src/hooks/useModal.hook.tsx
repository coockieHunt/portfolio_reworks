import { useState, useCallback } from 'react';
import { useScrollbar } from './useScrollBar.hook';

import { IUseModal, IModal } from './interface/useModal.interface';

/**
 * Custom React hook for managing multiple modal dialogs.
 *
 * This hook provides state and handlers for opening, closing, and tracking multiple modals.
 * It also integrates with a scrollbar hook to manage scroll locking when modals are open.
 *
 * @returns {Object} An object containing:
 *   - {Array} modals: Array of modal objects ({ isOpen, title, content }).
 *   - {Function} openModal: Function to open a new modal. Accepts (title: string, content: ReactNode).
 *   - {Function} closeModal: Function to close a modal by its index. Accepts (index: number).
 *   - {Function} closeAllModals: Function to close all open modals.
 */
export const UseModal = (): IUseModal => {
    const [modals, setModals] = useState<IModal[]>([]);

    useScrollbar(modals.length > 0);

    const openModal = useCallback(
        (
            title: React.ReactNode,
            content: React.ReactNode,
            light: 'light' | 'dark' = 'dark',
        ) => {
            setModals((prev) => [
                ...prev,
                { isOpen: true, title, content, light },
            ]);
        },
        [],
    );

    const closeModal = useCallback((index: number) => {
        setModals((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const closeAllModals = useCallback(() => {
        setModals([]);
    }, []);

    return {
        modals,
        openModal,
        closeModal,
        closeAllModals,
    };
};
