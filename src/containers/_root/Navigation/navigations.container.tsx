// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from '@tanstack/react-router';

// Hooks & Context
import { useScrollbar } from '@/hooks/useScrollBar.hook';
import { useWindowSize } from '@/hooks/useScreenResize.hook';

// Components
import { BurgerMenuComponent } from '@/components/BurgerMenu/BurgerMenu.component';
import { IconButton } from '@/components/Button/IconButton';
import { LogoComponent } from '@/components/Logo/Logo.components';

// Data & Config
import { SCREEN_SIZE } from '@/config';
import { socialLinks } from '@/data';
import cv from '@/assets/pdf/cv_dev_JG.pdf';

import * as Styled from './navigations.style';

export interface INavItem {
    display: string;
    to: string;
    type: 'scroll' | 'route';
}

export interface INavigationComponentProps {
    navConfig: INavItem[];
    brandColor?: string;
}

interface INavigationLinksProps {
    items: INavItem[];
    onLinkClick: () => void;
}

const NavigationLinks: React.FC<INavigationLinksProps> = ({
    items,
    onLinkClick,
}) => {
    return (
        <>
            {items.map((item, index) => (
                <li key={`${item.display}-${index}`}>
                    {item.type === 'scroll' ? (
                        <ScrollLink
                            to={item.to}
                            onClick={onLinkClick}
                            href={`#${item.to}`}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                        >
                            <span>{index + 1}. </span>
                            {item.display}
                        </ScrollLink>
                    ) : item.type === 'route' ? (
                        <RouterLink 
                            to={item.to} 
                            onClick={onLinkClick} 
                            style={{ 
                                textDecoration: 'none', 
                                color: 'inherit',
                                textTransform: 'uppercase',
                            }}
                        >
                            {item.display}
                        </RouterLink>
                    ) : null}
                </li>
            ))}
        </>
    );
};


/**
 * A navigation component that renders a responsive menu with links and social icons.
 * Supports both scroll-based and route-based navigation.
 * 
 * @param props - The props for the NavigationComponent.
 * @param props.navConfig - Array of navigation items to render. Each item includes display text, target, and type ('scroll' or 'route').
 * @param props.brandColor - Optional brand color for the logo. Defaults to 'var(--primary)'.
 * @returns The rendered NavigationComponent.
 */
export const NavigationComponent: React.FC<INavigationComponentProps> = ({
    navConfig,
    brandColor = 'var(--primary)',
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const mobileBreakpoint = useMemo(() => {
        return parseInt(SCREEN_SIZE.mobile.replace(/\D/g, ''), 10) || 768;
    }, []);

    const isMobileRaw = useWindowSize(mobileBreakpoint);
    const isMobile = isMobileRaw === true;

    useScrollbar(menuOpen && isMobile);

    useEffect(() => {
        if (!isMobile && menuOpen) {
            setMenuOpen(false);
        }
    }, [isMobile, menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    const handleOpenCv = useCallback(() => {
        window.open(cv, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <Styled.NavigationContainer className={menuOpen ? 'NavOpen' : 'NavClose'}>
            <Styled.BrandContainer>
                <RouterLink to="/" aria-label="Aller à la page d'accueil">
                    <LogoComponent
                        version="simple-full"
                        style={{ width: '16px', height: 'auto', color: brandColor }}
                    />
                </RouterLink>

                <div className="burger-menu-wrapper">
                    <BurgerMenuComponent val={menuOpen} onClick={toggleMenu} />
                </div>
            </Styled.BrandContainer>

            <Styled.Nav
                id="primary-navigation"
                className={menuOpen ? 'NavOpen' : 'NavClose'}
                role="navigation"
                aria-label="Navigation principale"
            >
                <ul>
                    <NavigationLinks
                        items={navConfig}
                        onLinkClick={closeMenu}
                    />
                </ul>

                <div className="info">
                    {socialLinks.map((link, index) => (
                        <IconButton
                            key={index}
                            icon={link.icon}
                            color={link.color}
                            to={link.url}
                            text={link.text}
                        />
                    ))}
                    <button onClick={handleOpenCv} type="button" className="cv-desktop-btn">
                        Curriculum Vitae
                    </button>
                </div>

                <button
                    className="cv-mobile-btn"
                    type="button"
                    aria-label="Ouvrir le CV (nouvelle fenêtre)"
                    onClick={handleOpenCv}
                >
                    Curriculum Vitae
                </button>
            </Styled.Nav>
        </Styled.NavigationContainer>
    );
};