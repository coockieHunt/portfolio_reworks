import React, { useState } from 'react';
import { Link } from "react-scroll";


// hook
import {useScrollbar} from "../../hooks/scroolBar.hook"
import {useWindowSize} from "../../hooks/screenResize.hook"

//component
import {BurgerMenuComponent} from "../../components/BurgerMenu/BurgerMenu.component"
import { IconButton } from "../../components/Buttton/Button.component"

// logo
import brand_logo from '../../image/main_logo.svg'

//style
import {
    NavigationContainer,
    Logo,
    Nav,
    BrandContainer
} from './navigations.style';

// icon
import{
  AiFillGithub,
  AiOutlineUser
}from 'react-icons/ai';

import{
  FaDeviantart
}from 'react-icons/fa';

import{
  SCREEN_SIZE
} from '../../config'



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


export const NavigationComponent = ({navConfig}) =>{
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
              <IconButton icon={<AiFillGithub />} color="#6e5494"/>
              <IconButton icon={<AiOutlineUser/>} color="#0e63ff"/>
              <IconButton icon={<FaDeviantart/>} color="#05cc46"/>
          </div>
         
        </Nav>
      </NavigationContainer>
    );
}