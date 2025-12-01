//react
import { useState, useEffect } from 'react';
import { Link } from "react-scroll";

// hook
import { useScrollbar } from "../../hooks/useScrollBar.hook.jsx"
import { useWindowSize } from "../../hooks/useScreenResize.hook.jsx"

//component
import { BurgerMenuComponent } from "../../components/BurgerMenu/BurgerMenu.component"
import { IconButton } from "../../components/Button/Button"
import { LogoComponent } from '../../components/Logo/Logo.components.jsx';

//style
import * as Styled from './navigations.style';

// config
import { SCREEN_SIZE, getColorSettings } from '../../config'; 

// data
import { socialLinks } from '../../data.jsx'

//context
import { useSettingContext } from '../../context/Setting.context';

// assets
import cv from '../../assets/pdf/cv_dev_JG.pdf';

const BuildNavigation = ({ menuItems, onClick }) => {
    return (
        menuItems.map((item, index) => (
            <li key={index}>
                <Link 
                    to={item[1]} 
                    onClick={onClick} 
                    href={`${window.location.origin}/#${item[1]}`} 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={500} 
                    style={{textDecoration: "none", color: "inherit"}}
                >
                    <span>{index + 1} . </span>
                    {item[0]}
                </Link>
            </li>
        ))
    );
};

export const NavigationComponent = ({ navConfig }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {settings} = useSettingContext();

    const mobileBreakpoint = parseInt(SCREEN_SIZE.mobile.replace('px', ''));
    
    const isMobile = useWindowSize(mobileBreakpoint);

    useScrollbar(menuOpen && isMobile);

    const toggleMenu = () => { setMenuOpen(!menuOpen); };

    useEffect(() => {
        if (!isMobile && menuOpen) {
            setMenuOpen(false);
        }
    }, [isMobile, menuOpen]);
    
    return (
        <Styled.NavigationContainer className={menuOpen ? "NavOpen" : "NavClose"} >
            <Styled.BrandContainer>
                <LogoComponent version="simple-full" style={{ width: "16px", height: "auto", color: getColorSettings(settings.theme).primary }} />
                <div className="burger-menu-wrapper">
                    <BurgerMenuComponent val={menuOpen} onClick={() => toggleMenu()} />
                </div>
            </Styled.BrandContainer>
            
            <Styled.Nav 
                id="primary-navigation"
                className={menuOpen ? "NavOpen" : "NavClose"}
                role="navigation"
                aria-label="Navigation principale"
            >
                <ul>
                    <BuildNavigation
                        menuItems={navConfig}
                        onClick={() => setMenuOpen(false)}
                    />
                </ul>

                <div className="info" >
                    {socialLinks.map((link, index) => (
                        <IconButton
                            key={index}
                            icon={link.icon}
                            color={link.color}
                            to={link.url}
                            text={link.text}
                            textX={link.textX}
                        />
                    ))}

                    <button 
                        onClick={() => window.open(cv, '_blank')}
                    >curiculum vitae</button>
                </div>
                
                <button 
                    className="cv-mobile-btn"
                    type="button"
                    aria-label="Ouvrir le CV (nouvelle fenêtre)"
                    onClick={() => window.open(cv, '_blank')}
                >curiculum vitae</button>
            </Styled.Nav>
        </Styled.NavigationContainer>
    );
}