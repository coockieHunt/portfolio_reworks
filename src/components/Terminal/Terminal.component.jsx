import * as styled from "./style/Terminal.style";
import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

/**
 * TerminalComponent displays a terminal-like UI with expandable/collapsible items.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.data - Array of product objects to display. Each object should have at least `id`, `title`, `subTitle`, `icon`, and `description` properties.
 * @param {string} [props.path="jonathangleyze.fr/projets"] - The base path displayed in the terminal header.
 * @param {string} [props.command="ls /projects --DDtree"] - The command string displayed in the terminal prompt.
 * @returns {JSX.Element} The rendered TerminalComponent.
 */
const TerminalLineItem = ({ product, openItemId, onItemClick }) => {
    const isOpen = openItemId === product.id;
    const IfSelectedClass = isOpen ? 'selected' : '';

    return (
        <styled.TerminalLine className={IfSelectedClass}>
            <div 
                className="header" 
                onClick={() => onItemClick(product.id)} 
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`terminal-content-${product.id}`}
                aria-label={`${product.title} - ${product.subTitle}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onItemClick(product.id); } }}
            >
                <div className="left" aria-hidden="true">
                    <span>{String(product.id).padStart(2, '0')}</span>
                    {product.icon}
                </div>

                <div className="info " aria-hidden="true">
                    <styled.LineTag className="title font_code">[{product.title}]</styled.LineTag>
                    <styled.LineTag className="subtitle font_code">{product.subTitle}</styled.LineTag>
                </div>

                <div className="action" aria-hidden="true">
                    <styled.Separator aria-hidden="true"><FaArrowDown /></styled.Separator>
                </div>
            </div>
            {isOpen &&
                <div 
                    id={`terminal-content-${product.id}`}
                    className="content"
                    role="region"
                    aria-labelledby={`terminal-header-${product.id}`}
                >
                    <div className="card">
                        <span aria-hidden="true"><FaArrowRight /></span>
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

        if (newId === null) {setTitle("/"); 
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
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenItemId(null); 
                setTitle('/');
            }
        };

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
