import React from 'react';
import {BurgerMenuContainer} from './style/BurgerMenu.style'

export const BurgerMenuComponent = ({ val, onClick }) => {
  return (
    <BurgerMenuContainer
      className={val ? 'open' : ''}
      onClick={onClick}
      aria-label={val ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
      aria-expanded={val}
      aria-controls="primary-navigation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div></div>
      <div></div>
      <div></div>
    </BurgerMenuContainer>
  );
};
