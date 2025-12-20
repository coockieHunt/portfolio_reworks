// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from "react-scroll";

// Hooks & Context
import { useScrollbar } from "../../hooks/useScrollBar.hook";
import { useWindowSize } from "../../hooks/useScreenResize.hook";
import { useSettingContext } from '../../context/Setting.context';

// Components
import { BurgerMenuComponent } from "../../components/BurgerMenu/BurgerMenu.component";
import { IconButton } from "../../components/Button/IconButton";
import { LogoComponent } from '../../components/Logo/Logo.components';

// Data & Config
import { SCREEN_SIZE, getColorSettings } from '../../config';
import { socialLinks } from '../../data';
import cv from '../../assets/pdf/cv_dev_JG.pdf';

import * as Styled from './navigations.style';

export type NavTuple = [string, string];

export interface INavigationComponentProps {
    navConfig: NavTuple[];
}

interface INavigationLinksProps {
    items: NavTuple[];
    onLinkClick: () => void;
}

const NavigationLinks: React.FC<INavigationLinksProps> = ({ items, onLinkClick }) => {
    return (
        <>
            {items.map(([label, targetId], index) => (
                <li key={`${targetId}-${index}`}>
                    <Link
                        to={targetId}
                        onClick={onLinkClick}
                        href={`#${targetId}`} 
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <span>{index + 1}. </span>
                        {label}
                    </Link>
                </li>
            ))}
        </>
    );
};


export const NavigationComponent: React.FC<INavigationComponentProps> = ({ navConfig }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { settings } = useSettingContext();

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

    const primaryColor = getColorSettings(settings.theme).primary;

    return (
        <Styled.NavigationContainer className={menuOpen ? "NavOpen" : "NavClose"}>
            <Styled.BrandContainer>
                <LogoComponent 
                    version="simple-full" 
                    style={{ width: "16px", height: "auto", color: primaryColor }} 
                />
                <div className="burger-menu-wrapper">
                    <BurgerMenuComponent val={menuOpen} onClick={toggleMenu} />
                </div>
            </Styled.BrandContainer>

            <Styled.Nav
                id="primary-navigation"
                className={menuOpen ? "NavOpen" : "NavClose"}
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
                    <button onClick={handleOpenCv} type="button">
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