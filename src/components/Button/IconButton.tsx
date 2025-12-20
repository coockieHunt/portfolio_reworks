import React from 'react';
import { IconContainer } from './style/Icon.style';

//type
export interface IconButtonProps {
    color?: string;
    icon: React.ReactElement;
    to?: string;
    onClick?: () => void;
    text?: string;
    textX?: string;
    textY?: string;
    iconSize?: string;
    ariaLabel?: string;
}

/**
 * IconButton Component
 *
 * This component renders an icon button with optional color, tooltip, and navigation link.
 *
 * @param color - The color of the icon button(optional).
 * @param icon - The icon element to be displayed inside the button.
 * @param to - The URL or path to navigate to when the button is clicked (optional).
 * @param onClick - On clock event.
 * @param text - Text on display on hover (optional).
 * @param textX - Change text position on hover (optional).
 * @param textY - Change text position on hover (optional).
 * @param iconSize - Size on icon (optional).
 */
export const IconButton: React.FC<IconButtonProps> = ({ color, icon, to, onClick, text, textX = "-50%", textY = "120%", iconSize, ariaLabel }) => {
    const isExternal = to && to.startsWith('http');
    const ariaLabelValue = ariaLabel || text || (isExternal ? ('lien externe ' + to) : ('lien interne ' + to));
    return (
        <IconContainer 
            $color={color} 
            href={to || '#'}
            onClick={onClick} 
            $textX={textX} 
            $textY={textY}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabelValue}
            title={ariaLabelValue}
            role="link"
        >
            {React.cloneElement(icon, { size: iconSize, 'aria-hidden': true, focusable: false } as any)}
            <span aria-hidden="true">{text}</span>
        </IconContainer>
    );
};