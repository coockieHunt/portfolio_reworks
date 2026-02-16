import React from 'react';

//style
import { ButtonContainer } from './style/Button.style';

//type
export interface ButtonProps {
    onClick?: () => void;
    padding?: string;
    color?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    icon_right?: boolean;
    disabled?: boolean;
    className?: string;
    target?: string;
    href?: string;
}

/**
 * Button Component
 *
 * This component renders a customizable button with optional icon and click handler.
 *
 * @param {() => void} [onClick] - Function to call when the button is clicked.
 * @param {string} [color] - Color of the button border and text.
 * @param {React.ReactNode} children - The content to be displayed inside the button.
 * @param {React.ReactNode} [icon] - Optional icon to be displayed alongside the button text.
 * @param {boolean} [icon_right=false] - If true, the icon will be displayed on the right side of the text.
 * @param {boolean} [disabled=false] - If true, the button will be disabled and not clickable.
 * @param {string} [className] - Additional CSS class for custom styling.
 * @param {string} [target] - Specifies where to open the linked document (used when href is provided).
 * @param {string} [href] - If provided, the button will render as an anchor tag linking to this URL.
 * @param {string} [padding] - Custom padding for the button.
 *
 * @returns {JSX.Element} The rendered Button component.
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
    padding,
    href,
}) => {
    const isAnchor = Boolean(href) && !disabled;
    return (
        <ButtonContainer
            as={isAnchor ? 'a' : 'button'}
            href={isAnchor ? href : undefined}
            target={isAnchor ? target || '_self' : undefined}
            rel={
                isAnchor && target === '_blank'
                    ? 'noopener noreferrer'
                    : undefined
            }
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            $colorLine={color}
            className={`${disabled ? 'disabled ' : ''}bg_color_primary${className ? ` ${className}` : ''}`}
            type={!isAnchor ? 'button' : undefined}
            style={{ padding: padding ? padding : '15px 20px' }}
        >
            {icon && !icon_right && <div className="icon">{icon}</div>}

            <span>{children}</span>

            {icon && icon_right && <div className="icon">{icon}</div>}
        </ButtonContainer>
    );
};
