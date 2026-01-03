import { BurgerMenuContainer } from './BurgerMenu.style';
import { IBurgerMenuComponentProps } from './BurgerMenu.interface';
/**
 * BurgerMenuComponent
 *
 * A stateless presentational component that renders a hamburger menu button.
 * The component is accessible and keyboard-navigable; it delegates open/close
 * behavior to the parent via the provided onClick handler.
 *
 * Props:
 * @param {Object} props - Component props.
 * @param {boolean} props.val - Whether the menu is open. When true, the 'open'
 * @param {Function} props.onClick - Handler invoked when the user clicks or activates the control via keyboard (Enter or Space).
 *
 * @returns {JSX.Element} A focusable, clickable element styled as a hamburger
 * Example:
 * <BurgerMenuComponent val={isOpen} onClick={() => setIsOpen(!isOpen)} />
 */

export const BurgerMenuComponent = ({
    val,
    onClick,
}: IBurgerMenuComponentProps) => {
    return (
        <BurgerMenuContainer
            className={val ? 'open' : ''}
            onClick={onClick}
            aria-label={
                val
                    ? 'Fermer le menu de navigation'
                    : 'Ouvrir le menu de navigation'
            }
            aria-expanded={val}
            aria-controls="primary-navigation"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div></div>
            <div></div>
            <div></div>
        </BurgerMenuContainer>
    );
};
