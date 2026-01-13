import { LinkContainer } from './style/link.style';
import { Link as ScrollLink } from 'react-scroll';
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
 * A unified link component that handles internal routing, smooth scrolling, and external navigation.
 * 
 * Depending on the `type` prop, it renders:
 * - `route`: A `@tanstack/react-router` link for SPA navigation.
 * - `scroll`: A `react-scroll` link for smooth scrolling to an anchor (automatically handles '#' stripping).
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
            <ScrollLink 
                to={safeHref.replace('#', '')}
                href={safeHref.startsWith('#') ? safeHref : `#${safeHref}`} 
                spy={true}
                smooth={true}
                duration={500}
                aria-label={ariaLabel} 
                className={className} 
                onClick={onClick}
            >
                {children}
            </ScrollLink>
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