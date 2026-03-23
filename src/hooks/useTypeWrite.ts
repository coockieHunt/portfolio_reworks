import { useState, useEffect } from 'react';

/**
 * Custom hook to create a typewriter effect for a given text.
 * @param {string} text - The full text to be displayed with the typewriter effect.
 * @param {boolean} start - Flag to start the typewriting effect.
 * @param {number} speed - Speed of typing in milliseconds per character (default is 40ms).
 * @returns {Object} - An object containing the current displayed text and a boolean indicating if typing is done.
*/
export const useTypewriter = (text: string, start: boolean, speed: number = 40) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsDone(false);

        if (!start) return;

        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                setIsDone(true);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, start]);

    return { text: displayedText, isDone };
};