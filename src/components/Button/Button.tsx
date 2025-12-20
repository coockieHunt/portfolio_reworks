import React from 'react';

//style
import { ButtonContainer } from './style/Button.style';

//type
export interface ButtonProps {
    onClick?: () => void;
    color?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    icon_right?: boolean;
    disabled?: boolean;
    onclick?: () => void;
    className?: string;
    target?: string;
    href?: string;    
}

/**
 * Button Component
 * 
 * This component renders a customizable button with optional icon and click handler.
 * 
 * @param onClick {Function} - Callback function to be executed when the button is clicked.
 * @param color {string} - Color of the button.
 * @param children {ReactNode} - Content to be displayed inside the button.
 * @param icon {ReactNode} - Optional icon element to be displayed before the button content.
 * @param icon_right {boolean} - If `true`, the icon will be displayed to the right of the button content.
 * @param disabled {boolean} - If `true`, the button will be disabled and cannot be clicked.
 */
export const Button: React.FC<ButtonProps> = ({
    onClick, 
    color, 
    children, 
    icon, 
    icon_right, 
    disabled, 
    className,
    target,
    href 
    }) => {

    const isAnchor = Boolean(href) && !disabled;

    return (
        <ButtonContainer 
            as={isAnchor ? 'a' : 'button'}

            href={isAnchor ? href : undefined}
            target={isAnchor ? (target || '_self') : undefined}
            rel={isAnchor && target === '_blank' ? 'noopener noreferrer' : undefined}

            onClick={!disabled ? onClick : undefined} 
            disabled={disabled} 
            $colorLine={color} 
            
            className={`${disabled ? "disabled " : ""}bg_color_primary${className ? ` ${className}` : ''}`}
            
            type={!isAnchor ? "button" : undefined}
        >
            {icon && !icon_right && <div className="icon">{icon}</div>}
            
            <span>{children}</span>
            
            {icon && icon_right && <div className="icon">{icon}</div>}
        </ButtonContainer>
    );
}


