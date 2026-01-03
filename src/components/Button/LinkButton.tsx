import { LinkContainer } from './style/link.style';

//type
export interface LinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    ariaLabel?: string;
}

/**
 * Link Component
 *
 * This Component returns a custom link element that can be used for various purposes,
 * such as navigation or triggering a Component when clicked.
 *
 * @param children - The content to be displayed inside the link.
 * @param onClick - The function to be executed when the link is clicked (optional).
 * @param href - The URL to navigate to (optional).
 * @param className - ClassName on link
 * @returns {ReactNode} - A custom link element.
 */
export const Link: React.FC<LinkProps> = ({
    children,
    onClick,
    href,
    className,
    ariaLabel,
}) => {
    return (
        <LinkContainer
            href={href || '#'}
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            role="link"
        >
            {children}
        </LinkContainer>
    );
};
