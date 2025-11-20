import * as styled from "./style/Terminal.style";
import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const TerminalLineItem = ({ product, openItemId, onItemClick }) => {
    const isOpen = openItemId === product.id;
    const IfSelectedClass = isOpen ? 'selected' : '';

    return (
        <styled.TerminalLine className={IfSelectedClass}>
            <div className="header" onClick={() => onItemClick(product.id)} aria-expanded={isOpen}>
                <div className="left">
                    <span>{String(product.id).padStart(2, '0')}</span>
                    {product.icon}
                </div>

                <div className="info ">
                    <styled.LineTag className="title font_code">[{product.title}]</styled.LineTag>
                    <styled.LineTag className="subtitle font_code">{product.subTitle}</styled.LineTag>
                </div>

                <div className="action">
                    <styled.Separator aria-hidden="true"><FaArrowDown /></styled.Separator>
                </div>
            </div>
            {isOpen &&
            <div className="content">
                <div className="card">
                    <span><FaArrowRight /></span>
                    <p>{product.description}</p>
                </div>
            </div>
            }
        </styled.TerminalLine>
    );
};

export const TerminalComponent = ({ data, path = "jonathangleyze.fr/projets", command = "ls /projects --DDtree" }) => {
    const [openItemId, setOpenItemId] = useState(null);
    const [Title, setTitle] = useState('/');
    const containerRef = useRef(null);

   const handleItemClick = (id) => {
    setOpenItemId(prevId => {
        const newId = prevId === id ? null : id;

        if (newId === null) {
            setTitle("/"); 
        } else {
             const selectedProduct = data.find(p => p.id === newId);
             if (selectedProduct) {
                setTitle("/" + selectedProduct.title);
             }
        }
        return newId;
    });
};

    useEffect(() => {
        //if click is outside of container close all
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenItemId(null); 
                setTitle('/');
            }
        };

        //Click event
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {document.removeEventListener('mousedown', handleOutsideClick);};
    }, [openItemId, containerRef]);

    return (
        <styled.TerminalContainer  ref={containerRef}>
            <styled.TerminalHeader>
                <styled.TerminalPath >
                    {path}{Title}
                </styled.TerminalPath>
            </styled.TerminalHeader>

            <styled.TerminalBody>
                <styled.CommandPromptWrapper className="font_code" style={{"color": "green"}}>{' '}{command}</styled.CommandPromptWrapper>
                <styled.ServicesListWrapper>
                    {data.map((product) => (
                        <TerminalLineItem 
                            key={product.id} 
                            product={product} 
                            openItemId={openItemId} 
                            onItemClick={handleItemClick} 
                        />
                    ))}
                </styled.ServicesListWrapper>
            </styled.TerminalBody>
        </styled.TerminalContainer>
    );
};
