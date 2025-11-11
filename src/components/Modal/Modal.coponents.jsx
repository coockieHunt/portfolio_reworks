import React, {useEffect} from "react";
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
export const ModalComponent = ({ modals, onClose }) => {
    const handleKeyDown = (event, index) => {
        if (event.key === "Escape") {
          onClose(index);
        }
      };
    
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
    return (
        <AnimatePresence>
            {modals.map((modal, index) => (
                <React.Fragment key={index}>
                    {modal.isOpen && (
                        <>
                            <BackDrop
                                $initial={{ opacity: 0 }}
                                $animate={{ opacity: 1 }}
                                $transition={{ ease: "easeOut", duration: 0.3 }}
                                exit={{ opacity: 0 }}
                                onClick={() => onClose(index)}
                            />
                            <ModalDiv
                                $initial={{ y: 10, x: "-50%", opacity: 1 }}
                                $animate={{ y: 50, opacity: 1 }}
                                $transition={{ ease: "easeOut", duration: 0.3 }}
                                exit={{ y: 100, opacity: 0 }}
                            >
                                <Top>
                                    <AiOutlineClose onClick={() => onClose(index)} />
                                </Top>
                                <Content>
                                    <h1>{modal.title}</h1>
                                    {modal.content}
                                </Content>
                            </ModalDiv>
                        </>
                    )}
                </React.Fragment>
            ))}
        </AnimatePresence>
    );
};
