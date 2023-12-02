import React, { useState, useEffect } from 'react';

//style
import { ButtonContainer } from './style/Button.style';
import { OutileButtonContainer } from './style/OutlineButton.style';
import { ArrowContainerFixed, ArrowContainer } from './style/Arrow.style';
import { IconContainer } from './style/Icon.style';
import { LinkContainer } from './style/link.style'

//hook
import { useScrollOffsetY as useScrollOffsetY } from '../../hooks/offsetScroll.hook';

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
        <ButtonContainer onClick={!disabled ? onClick : null} colorLine={color} className={disabled ? "disabled bg_color_primary" : "bg_color_primary"}>
            {icon_right ? 
                <><div className="icon">{icon}</div> <span>{children}</span></> :
                <><span>{children}</span> <div className="icon">{icon}</div></>
            }
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
        <OutileButtonContainer onClick={!disabled ? onClick : null} colorLine={color} className={disabled ? "disabled" : null}>
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
 * @param {object} props - The properties of the ScrollToTop component.
 * @param {number} hide_top - The position at which the scroll-to-top button should hide. 
 * @param {number} hide_bottom - The position at which the scroll-to-bottom button should hide. 
 * @returns {ReactNode} - A button component to scroll to the top of the page.
 */
export const ScrollToTop = ({ hide_top = 400, hide_bottom = 450, auto_hide= true }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    if(auto_hide){
        const scrollY = useScrollOffsetY(hide_top);
        const [isFixed, setIsFixed] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                const scrollPosition = window.scrollY + window.innerHeight;
                setIsFixed(scrollPosition >= document.body.scrollHeight - hide_bottom);
            };
    
            window.addEventListener('scroll', handleScroll);
            return () => {window.removeEventListener('scroll', handleScroll);};
        }, []);

        return (
            <button>
                <ArrowContainerFixed 
                    onClick={scrollToTop} 
                    className={!scrollY || isFixed ? 'hide' : ''}
                >
                    <div></div>
                    <div></div>
                </ArrowContainerFixed>
            </button>
        )
    }


    
    return (
        <button>
            <ArrowContainer 
                onClick={scrollToTop} 
            >
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
 * @param color - The color of the icon button(optional).
 * @param icon - The icon element to be displayed inside the button.
 * @param to - The URL or path to navigate to when the button is clicked (optional).
 * @param onClick - On clock event.
 * @param text - Text on display on hover (optional).
 * @param textX - Change text position on hover (optional).
 * @param textY - Change text position on hover (optional).
 * @param iconSize - Size on icon (optional).
 */
export const IconButton = ({ color, icon, to, onClick, text, textX = "-50%", textY = "120%", iconSize }) => {
    return (
        <IconContainer 
            color={color} 
            to={to} 
            onClick={onClick} 
            $textX={textX} 
            $textY={textY}
        >
            {React.cloneElement(icon, { size: iconSize })}
            <span>{text}</span>
        </IconContainer>
    );
};
/**
 * Link Component
 *
 * This Component returns a custom link element that can be used for various purposes,
 * such as navigation or triggering a Component when clicked.
 *
 * @param children - The content to be displayed inside the link.
 * @param onClick - The function to be executed when the link is clicked (optional).
 * @param className - ClassName on link
 * @returns {ReactNode} - A custom link element.
 */
export const Link = ({ children, onClick, className }) => {
    return (
        <LinkContainer onClick={onClick} className={className}>
            {children}
        </LinkContainer>
    )
}