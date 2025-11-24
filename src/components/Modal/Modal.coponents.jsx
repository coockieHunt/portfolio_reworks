import React, {useEffect} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from 'framer-motion';
import { ModalDiv, BackDrop, Top, Content } from "./style/Modal.style";
import { AiOutlineClose  } from 'react-icons/ai';

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
const ModalItem = ({ modal, index, onClose }) => {
    const closeBtnRef = React.useRef(null);
    const modalDivRef = React.useRef(null);

    useEffect(() => {
        if (modal.isOpen) {
            setTimeout(() => {
                try { 
                    closeBtnRef.current && closeBtnRef.current.focus(); 
                } catch (e) {}
            }, 0);
        }
    }, [modal.isOpen]);

    return (
        <>
            <BackDrop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                onClick={() => onClose(index)}
            />
            <ModalDiv
                ref={modalDivRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`modal-title-${index}`}
                tabIndex={-1}
                initial={{ y: "calc(-50% - 50px)", x: "-50%", opacity: 0 }}
                animate={{ y: "-50%", x: "-50%", opacity: 1 }}
                exit={{ y: "calc(-50% + 50px)", x: "-50%", opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
            >
                <Top>
                    <button 
                        ref={closeBtnRef}
                        onClick={() => onClose(index)} 
                        aria-label="Fermer la fenêtre modale" 
                        title="Fermer"
                        style={{background:'transparent', border:'none', padding:0, cursor:'pointer'}}
                    >
                        <AiOutlineClose aria-hidden="true" focusable={false} />
                    </button>
                </Top>
                <Content>
                    <h1 id={`modal-title-${index}`}>{modal.title}</h1>
                    {modal.content}
                </Content>
            </ModalDiv>
        </>
    );
};

export const ModalComponent = ({ modals, onClose }) => {
    // Handle key down events for accessibility
    const handleKeyDown = (event, index) => {
        if (event.key === "Escape") {onClose(index);}
    };

    // Add global keydown listener to handle Escape key for closing modals end return on last opened modal
    useEffect(() => {
        const handleKeyDownGlobal = (event) => {
          const lastOpenedModalIndex = modals.findIndex((modal) => modal.isOpen);
          if (lastOpenedModalIndex !== -1) {
            handleKeyDown(event, lastOpenedModalIndex);
          }
        };

        window.addEventListener("keydown", handleKeyDownGlobal);

        return () => {
          window.removeEventListener("keydown", handleKeyDownGlobal);
        };
      }, [modals]);

    const modalContent = (
        <AnimatePresence mode="wait">
            {modals.map((modal, index) => 
                modal.isOpen && (
                    <ModalItem key={`modal-${index}`} modal={modal} index={index} onClose={onClose} />
                )
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
