//react
import { useState } from 'react';
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

    const isMobile = useWindowSize(SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2),);

    useScrollbar(menuOpen);
    const toggleMenu = () => {setMenuOpen(!menuOpen);};
    const {settings} = useSettingContext();
    
    return (
        <Styled.NavigationContainer className={menuOpen ? "NavOpen" : "NavClose"} >
            <Styled.BrandContainer>
                <LogoComponent version="simple-full" style={{ width: "16px", height: "auto", color: getColorSettings(settings.theme).primary }} />
                {isMobile ? <BurgerMenuComponent val={menuOpen} onClick={() => toggleMenu()} /> : null}
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
                </div>
            </Styled.Nav>
        </Styled.NavigationContainer>
    );
}