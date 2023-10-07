/**
 * A custom hook that can be used to disable or enable the scrollbars on the body element of a web page.
 *
 * @param {boolean} disableScrollbar - A boolean value indicating whether to disable the scrollbar (true) or enable it (false).
 */

import { useEffect } from 'react';

export const useScrollbar = (disableScrollbar) => {
  useEffect(() => {
    const handleScrollbar = () => {
      document.body.style.overflow = disableScrollbar ? 'hidden' : 'auto';
    };
    
    handleScrollbar();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [disableScrollbar]);
};