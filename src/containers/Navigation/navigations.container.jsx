import { useState } from 'react';
import { Link } from "react-scroll";
import { socialLinks } from '../../data.jsx'

// hook
import { useScrollbar } from "../../hooks/scrollBar.hook"
import { useWindowSize } from "../../hooks/screenResize.hook"
import { useScrollOffsetY } from '../../hooks/offsetScroll.hook';

//component
import { BurgerMenuComponent } from "../../components/BurgerMenu/BurgerMenu.component"
import { IconButton } from "../../components/Button/Button"



//style
import * as Styled from './navigations.style';

// config
import * as config from '../../config.jsx'

//logo
import { LogoComponent } from '../../components/Logo/Logo.components.jsx';
import { getColorSettings } from '../../config';
import { useSettingContext } from '../../context/Setting.context';


const BuildNavigation = ({ menuItems, onClick }) => {
    return (
        menuItems.map((item, index) => (
            <li key={index}>
                <Link activeClass="active" to={item[1]} onClick={onClick} >
                    <span>{index + 1} . </span>
                    {item[0]}
                </Link>
            </li>
        ))
    );
};

export const NavigationComponent = ({ navConfig }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const isMobile = useWindowSize(
        config.SCREEN_SIZE.mobile.substring(0, config.SCREEN_SIZE.mobile.length - 2),
    );

    useScrollbar(menuOpen);
    const toggleMenu = () => {setMenuOpen(!menuOpen);};
    const {settings} = useSettingContext();
    
    return (
        <Styled.NavigationContainer className={menuOpen ? "NavOpen" : "NavClose"} >
            <Styled.BrandContainer>
                <LogoComponent version="simple-full" style={{ width: "16px", height: "auto", color: getColorSettings(settings.theme).primary }} />
                {isMobile ? <BurgerMenuComponent val={menuOpen} onClick={() => toggleMenu()} /> : null}
            </Styled.BrandContainer>
            <Styled.Nav className={menuOpen ? "NavOpen" : "NavClose"}>
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
                            onClick={() => link.isFile ? window.open(link.url, '_blank') : window.location.href = link.url}
                            text={link.text}
                            textX={link.textX}
                        />
                    ))}
                </div>
            </Styled.Nav>
        </Styled.NavigationContainer>
    );
}