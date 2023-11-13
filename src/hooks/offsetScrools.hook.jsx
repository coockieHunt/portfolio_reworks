import { useState, useEffect } from 'react';

/**
 * Custom React hook to check if the current vertical scroll offset (Y) exceeds a given position.
 * 
 * @param {number} pos - The position to check against.
 * @returns {boolean} - `true` if the current scroll position exceeds `pos`, otherwise `false`.
 */
export const useScroolOffsetY = (pos) => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > pos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [pos]);
  
    return isScrolled;
  };