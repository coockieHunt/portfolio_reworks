import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import * as Styled from './Details.style';

interface DetailsComponentProps {
    Head: string;
    children?: React.ReactNode;
    rounded?: boolean;
    State?: boolean;
}

interface DetailsComponentProps {
    Head: string;
    children?: React.ReactNode;
    rounded?: boolean;
    isOpen: boolean;
    onToggle: () => void; 
}

export const DetailsComponent = ({ Head, children, rounded = false, isOpen, onToggle }: DetailsComponentProps) => {
    const contentId = `details-content-${Head.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <Styled.Container $rounded={rounded} $isOpen={isOpen}>
            <Styled.DropdownHead 
                onClick={onToggle} 
                aria-expanded={isOpen}
                aria-controls={contentId}
                $isOpen={isOpen}
            >
                {Head}
                <ArrowDown />
            </Styled.DropdownHead>
            
            <Styled.DropdownContent id={contentId} $isOpen={isOpen} aria-hidden={!isOpen}>
                <div className="inner-content">
                    {children}
                </div>
            </Styled.DropdownContent>
        </Styled.Container>
    );
};