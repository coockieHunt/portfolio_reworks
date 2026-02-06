import { LinkContainer } from './style/link.style';
import { Link as RouterLink } from '@tanstack/react-router';

export interface LinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    ariaLabel?: string;
    type: 'route' | 'scroll' | 'external';
}

/**
 * A unified link component that handles internal routing, smooth scrolling (via Lenis), and external navigation.
 * 
 * Depending on the `type` prop, it renders:
 * - `route`: A `@tanstack/react-router` link for SPA navigation.
 * - `scroll`: A native `<a>` tag with hash navigation (Lenis handles the smooth scrolling).
 * - `external`: A native `<a>` tag. Automatically adds `target="_blank"` and `rel="noopener noreferrer"` if the URL starts with "http".
 *
 * @param {LinkProps} props - The component properties.
 * @returns {JSX.Element} The rendered link wrapped in a LinkContainer.
 * 
 */
export const Link = ({ type, href, ariaLabel, className, onClick, children }: LinkProps) => {
  const safeHref = href || '/';

  return (
    <LinkContainer>
        {type === 'route' ? (
            <RouterLink 
                to={safeHref} 
                aria-label={ariaLabel} 
                className={className} 
                onClick={onClick}
            >
                {children}
            </RouterLink>
        ) : type === 'scroll' ? (
            <a 
                href={safeHref.startsWith('#') ? safeHref : `#${safeHref}`}
                aria-label={ariaLabel} 
                className={className} 
                onClick={onClick}
            >
                {children}
            </a>
        ) : (
            <a 
                href={safeHref} 
                aria-label={ariaLabel} 
                className={className} 
                onClick={onClick}
                target={safeHref.startsWith('http') ? '_blank' : undefined}
                rel={safeHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        )}
    </LinkContainer>
  );
};