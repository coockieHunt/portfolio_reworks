import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { ModalDiv, Top, Content } from './Modal.style';
import { X } from 'lucide-react';
import { BackDrop } from '../../styles/effect';

export interface IModal {
    isOpen: boolean;
    title?: React.ReactNode;
    content?: React.ReactNode;
    light?: 'light' | 'dark';
}

export interface IModalItemProps {
    modal: IModal;
    index: number;
    onClose: (index: number) => void;
    container?: HTMLElement | null;
}

export interface IModalComponentProps {
    modals: IModal[];
    onClose: (index: number) => void;
}

/**
 * ModalComponent is a React component that renders a modal.
 *
 * @component
 * @param {Object[]} modals - An array of modal objects.
 * @param {boolean} modals.isOpen - Determines if the modal is open.
 * @param {string} modals.title - The title of the modal.
 * @param {ReactNode} modals.content - The content of the modal.
 * @param {function} onClose - A function to close the modal.
 * @returns {ReactNode} - Returns the modal component.
 */
const ModalItem = ({
    modal,
    index,
    onClose,
}: IModalItemProps): React.ReactElement | null => {
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    const modalDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!modal.isOpen) return;
        const t = window.setTimeout(() => {
            try {
                closeBtnRef.current?.focus();
            } catch (e) {}
        }, 0);
        return () => window.clearTimeout(t);
    }, [modal.isOpen]);

    return (
        <>
            <BackDrop $isOpen={modal.isOpen} onClick={() => onClose(index)} />

            <ModalDiv
                $light={modal.light || 'dark'}
                ref={modalDivRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`modal-title-${index}`}
                tabIndex={-1}
                initial={{ y: 'calc(-50% - 50px)', x: '-50%', opacity: 0 }}
                animate={{ y: '-50%', x: '-50%', opacity: 1 }}
                exit={{ y: 'calc(-50% + 50px)', x: '-50%', opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
                className='Modal'
            >
                <Top>
                    <button
                        ref={closeBtnRef}
                        onClick={() => onClose(index)}
                        aria-label="Fermer la fenêtre modale"
                        title="Fermer"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <X aria-hidden="true" focusable={false} />
                    </button>
                </Top>
                <Content $light={modal.light || 'dark'} role="document">
                    <h1 id={`modal-title-${index}`}>{modal.title}</h1>
                    {modal.content}
                </Content>
            </ModalDiv>
        </>
    );
};

export const ModalComponent = ({
    modals,
    onClose,
}: IModalComponentProps): React.ReactElement | null => {
    // Handle key down events for accessibility (global Escape to close last opened)
    const handleKeyDown = (event: KeyboardEvent, index: number) => {
        if (event.key === 'Escape') onClose(index);
    };

    useEffect(() => {
        const handleKeyDownGlobal = (event: KeyboardEvent) => {
            const lastOpenedModalIndex = modals
                .map((m) => m.isOpen)
                .lastIndexOf(true);
            if (lastOpenedModalIndex !== -1)
                handleKeyDown(event, lastOpenedModalIndex);
        };

        window.addEventListener('keydown', handleKeyDownGlobal);
        return () => window.removeEventListener('keydown', handleKeyDownGlobal);
    }, [modals, onClose]);

    if (typeof document === 'undefined') return null;

    const modalContent = (
        <AnimatePresence mode="wait">
            {modals.map((modal, index) =>
                modal.isOpen ? (
                    <ModalItem
                        key={`modal-${index}`}
                        modal={{ ...modal, light: modal.light || 'dark' }}
                        index={index}
                        onClose={onClose}
                    />
                ) : null,
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
