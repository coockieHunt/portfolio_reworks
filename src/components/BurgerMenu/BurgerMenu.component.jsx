import React from 'react';
import {BurgerMenuContainer} from './style/BurgerMenu.style'

export const BurgerMenuComponent = ({ val, onClick }) => {
  return (
    <BurgerMenuContainer className={val ? 'open' : ''} onClick={onClick}>
      <div></div>
      <div></div>
      <div></div>
    </BurgerMenuContainer>
  );
};
