import { useEffect } from 'react';

import { IUseScrollbar } from './interface/useScrollBar.interface';

/**
 * Custom React hook to enable or disable the scrollbar on the document body.
 *
 * @param {boolean} disable - If true, disables the scrollbar; if false, enables it.
 */
export const useScrollbar = (disable: boolean) : IUseScrollbar  => {
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


  return { disable };
};