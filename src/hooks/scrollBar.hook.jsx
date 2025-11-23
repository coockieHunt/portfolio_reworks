import { useEffect } from 'react';

/**
 * A custom hook that can be used to disable or enable the scrollbars on the body element of a web page.
 *
 * @param {boolean} disableScrollbar - A boolean value indicating whether to disable the scrollbar (true) or enable it (false).
 */
export const useScrollbar = (disableScrollbar) => {
  useEffect(() => {
    const handleScrollbar = () => {
      if (disableScrollbar) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        document.body.style.touchAction = 'auto';
      }
    };
    
    handleScrollbar();

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.touchAction = 'auto';
    };
  }, [disableScrollbar]);
};