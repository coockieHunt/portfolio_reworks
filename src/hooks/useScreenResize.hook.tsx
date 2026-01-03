import { useState, useEffect } from 'react';

/**
 * A custom hook that returns the current window size. If breakpoint size is provided, the hook returns true if width is less than the breakpoint size, else it returns the window width.
 * @param {number} breakpoint_size - The optional breakpoint size for window breakpoint.
 * @returns {number|boolean|undefined} - The window size or a boolean if breakpoint size is provided.
 */
export const useWindowSize = (
    breakpoint_size?: number,
): number | boolean | undefined => {
    const [WindowSize, setWindowSize] = useState<number | boolean | undefined>(
        () => {
            if (typeof window !== 'undefined') {
                return breakpoint_size !== undefined
                    ? window.innerWidth < breakpoint_size
                    : window.innerWidth;
            }
            return undefined;
        },
    );

    //debounce resize event
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (breakpoint_size !== undefined) {
                    setWindowSize(window.innerWidth < breakpoint_size);
                } else {
                    setWindowSize(window.innerWidth);
                }
            }, 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [breakpoint_size]);

    return WindowSize;
};
