import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import * as styled from "./Terminal.style";
import { trackEvent } from "../umami/umami.components";

export interface ITerminalProduct {
    id: number;
    title: string;
    subTitle: string;
    icon: React.ReactNode;
    description: string;
}

export interface ITerminalComponentProps {
    data: ITerminalProduct[];
    path?: string;
    command?: string;
}

interface ITerminalLineItemProps {
    product: ITerminalProduct;
    isOpen: boolean;
    onToggle: (id: number) => void;
}

const TerminalLineItem: React.FC<ITerminalLineItemProps> = ({ product, isOpen, onToggle }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(product.id);
        }
    };

    return (
        <styled.TerminalLine className={isOpen ? 'selected' : ''}>
            <div 
                className="header" 
                onClick={() => onToggle(product.id)} 
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`terminal-content-${product.id}`}
                aria-label={`Découvrir ${product.title} : ${product.subTitle}`}
                onKeyDown={handleKeyDown}
            >
                <div className="left" aria-hidden="true">
                    <span>{String(product.id).padStart(2, '0')}</span>
                    {product.icon}
                </div>

                <div className="info" aria-hidden="true">
                    <styled.LineTag className="title font_code">[{product.title}]</styled.LineTag>
                    <styled.LineTag className="subtitle font_code">{product.subTitle}</styled.LineTag>
                </div>

                <div className="action" aria-hidden="true">
                    <styled.Separator><FaArrowDown /></styled.Separator>
                </div>
            </div>

            {isOpen && (
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
            )}
        </styled.TerminalLine>
    );
};

export const TerminalComponent: React.FC<ITerminalComponentProps> = ({ 
    data, 
    path = "jonathangleyze.fr/solution", 
    command = "ls /projects --DDtree" 
}) => {
    const [openItemId, setOpenItemId] = useState<number | null>(null);
    const [currentPath, setCurrentPath] = useState('/');
    const containerRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (id: number) => {
        if (openItemId === id) {
            setOpenItemId(null);
            setCurrentPath('/');
            return;
        }

        const selectedProduct = data.find(p => p.id === id);
        setOpenItemId(id);
        
        if (selectedProduct) {
            setCurrentPath(`/${selectedProduct.title}`);
            trackEvent('terminal_item_click', { 
                product_id: selectedProduct.id,
                product_title: selectedProduct.title 
            });
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenItemId(null); 
                setCurrentPath('/');
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <styled.TerminalContainer ref={containerRef}>
            <styled.TerminalHeader>
                <styled.TerminalPath>
                    {path}{currentPath}
                </styled.TerminalPath>
            </styled.TerminalHeader>

            <styled.TerminalBody>
                <styled.CommandPromptWrapper className="font_code" style={{ color: "green" }}>
                    {' '}{command}
                </styled.CommandPromptWrapper>
                
                <styled.ServicesListWrapper>
                    {data.map((product) => (
                        <TerminalLineItem 
                            key={product.id} 
                            product={product} 
                            isOpen={openItemId === product.id}
                            onToggle={handleItemClick} 
                        />
                    ))}
                </styled.ServicesListWrapper>
            </styled.TerminalBody>
        </styled.TerminalContainer>
    );
};