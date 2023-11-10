import React from 'react';

//style
import { ButtonContainer } from './style/Button.style';
import { OutileButtonContainer } from './style/OutlineButton.style';
import { ArrowContainer } from './style/Arow.style';
import { IconContainer } from './style/Icon.style';
import { LinkContainer } from './style/link.style'


//component
import { Tooltip } from '../Tooltip/Tooltip.component';

//hook
import { useScroolOffsetY } from '../../hooks/offsetScrools.hook';

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

export const Button = ({ onClick, color, children, icon, icon_right, disabled }) => {
    return (
        <ButtonContainer onClick={!disabled ? onClick : null} colorLine={color} className={disabled ? "disabled" : null}>
            <div className="button-content">
                 {icon_right ? <>{icon} {children}</> : <>{children} {icon}</>}
            </div>
        </ButtonContainer>
    );
}

/**
 * OutlineButton Component
 * 
 * This component renders a customizable outline button with optional icon and click handler.
 * 
 * @param onClick {Function} - Callback function to be executed when the button is clicked.
 * @param color {string} - Color of the outline button.
 * @param children {ReactNode} - Content to be displayed inside the outline button.
 * @param icon {ReactNode} - Optional icon element to be displayed before the button content.
 * @param icon_right {boolean} - If `true`, the icon will be displayed to the right of the button content.
 * @param disabled {boolean} - If `true`, the button will be disabled and cannot be clicked.
 */
export const OutlineButton = ({ onClick, color, children, icon, icon_right, disabled }) => {
    return (
        <OutileButtonContainer onClonClickick={!disabled ? onClick : null} colorLine={color} className={disabled ? "disabled" : null}>
            <div className="button-content">
            {icon_right ? <>{icon} {children}</> : <>{children} {icon}</>}
            </div>
        </OutileButtonContainer>
    );
}

/**
 * ScrollToTop Component
 * 
 * This component renders a button that allows scrolling the page to the top when clicked.
 * 
 * @param {number} hide_position - The position at which the scroll-to-top button should hide. When the scroll position is greater than this value, the button is visible; otherwise, it's hidden.
 * @returns {ReactNode} - A button component to scroll to the top of the page.
 */
export const ScroolToTop = ({hide_position}) => {
    const scroolY = useScroolOffsetY(hide_position);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return(
        <button>
            <ArrowContainer onClick={scrollToTop} className={!scroolY ? "hide" : null}>
                <div></div>
                <div></div>
            </ArrowContainer>
        </button>
    )
}


/**
 * IconButton Component
 * 
 * This component renders an icon button with optional color, tooltip, and navigation link.
 * 
 * @param {string} color - The color of the icon button(optional).
 * @param {ReactNode} icon - The icon element to be displayed inside the button.
 * @param {string} to - The URL or path to navigate to when the button is clicked (optional).
 * @param {string} tooltip - The tooltip text to display when hovering over the button (optional).
 * @returns {ReactNode} - An icon button component.
 */
export const IconButton = ({color, icon, to, tooltip, onClick, text, textX = "-50%", textY = "120%"}) => {
    return(
        <Tooltip text={tooltip} onClick={onClick}>
            <IconContainer color={color} to={to} onClick={onClick} textX={textX} textY={textY}>
                {icon}
                <span>{text}</span>
            </IconContainer>
        </Tooltip>

    )
}

/**
 * Link Component
 * 
 * This Component returns a custom link element that can be used for various purposes,
 * such as navigation or triggering a Component when clicked.
 * 
 * @param {ReactNode} children - The content to be displayed inside the link.
 * @param {Function} onClick - The function to be executed when the link is clicked (optional).
 * @returns {ReactNode} - A custom link element.
 */
export const Link = ({children, onClick, className}) => {
    return(
        <LinkContainer onClick={onClick} className={className}>
            {children}
        </LinkContainer>
    )
}