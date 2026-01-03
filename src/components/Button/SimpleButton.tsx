import React from 'react';
import { StyledSimpleButton } from './style/SimpleButton.style';

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
    children,
    isActive,
    className,
    ...props
}) => (
    <StyledSimpleButton
        className={`${className || ''} ${isActive ? 'current' : ''}`}
        aria-pressed={isActive}
        {...props}
    >
        {children}
    </StyledSimpleButton>
);
