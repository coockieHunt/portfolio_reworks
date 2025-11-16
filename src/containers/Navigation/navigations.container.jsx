import React, { useState } from 'react';
import { Link } from "react-scroll";
import { URL } from '../../data.jsx'


// hook
import { useScrollbar } from "../../hooks/scrollBar.hook"
import { useWindowSize } from "../../hooks/screenResize.hook"

//component
import { BurgerMenuComponent } from "../../components/BurgerMenu/BurgerMenu.component"
import { IconButton } from "../../components/Button/Button"

// assets
import brand_logo from '../../assets/images/main_logo.svg'
import cv from '../../assets/pdf/cv_dev_JG.pdf'

//style
import {
    NavigationContainer,
    Logo,
    Nav,
    BrandContainer
} from './navigations.style';

// icon
import {
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';
import {
    BiSolidUser
} from 'react-icons/bi';

import {
    FaDeviantart
} from 'react-icons/fa';

import {
    SCREEN_SIZE
} from '../../config.jsx'



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
        SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2),
    );
    useScrollbar(menuOpen);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <NavigationContainer className={menuOpen ? "NavOpen" : "NavClose"}>
            <BrandContainer>
                <Logo src={brand_logo}
                    alt="brand_logo"
                />
                {isMobile ? <BurgerMenuComponent val={menuOpen} onClick={() => toggleMenu()} /> : null}
            </BrandContainer>

            <Nav className={menuOpen ? "NavOpen" : "NavClose"}>
                <ul>
                    <BuildNavigation
                        menuItems={navConfig}
                        onClick={() => setMenuOpen(false)}
                    />
                </ul>

                <div className="info">
                    <IconButton
                        icon={<AiFillGithub />}
                        color="#6e5494"
                        onClick={() => window.location.href = URL.github}
                        text="Github"
                    />
                    <IconButton
                        icon={<AiFillLinkedin />}
                        color="#0e76a8"
                        onClick={() => window.location.href = URL.linkedin}
                        text="Linkedin"
                    />
                    <IconButton
                        icon={<FaDeviantart />}
                        color="#05cc46"
                        onClick={() => window.location.href = URL.DeviantArt}
                        text="Deviantart"
                    />
                    <IconButton
                        icon={<BiSolidUser />}
                        color="#00ffc8"
                        onClick={() => window.open(cv, '_blank')}
                        text="Curriculum vitae"
                        textX="-90%"
                    />
                </div>

            </Nav>
        </NavigationContainer>
    );
}