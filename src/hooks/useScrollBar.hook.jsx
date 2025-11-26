import { useEffect } from 'react';

export const useScrollbar = (disable) => {
  useEffect(() => {
    if (disable) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; 
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [disable]);
};