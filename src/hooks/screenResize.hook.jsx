import { useState, useEffect } from "react";

/**
 * A custom hook that returns the current window size. If breakpoint size is provided, the hook returns true if width is less than the breakpoint size, else it returns the window width.
 * @param {number} breakpoint_size - The optional breakpoint size for window breakpoint.
 * @returns {number|boolean} - The window size or a boolean if breakpoint size is provided.
 */
export const useWindowSize = (breakpoint_size) => {
    const [WindowSize, setWindowSize] = useState(undefined)

    useEffect(() => {
        const handleResize = () => {
            if(breakpoint_size !== undefined){
                setWindowSize(window.innerWidth < breakpoint_size)
            }else{
                setWindowSize(window.innerWidth)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize();

        return() => window.removeEventListener("resize", handleResize);
    }, [breakpoint_size])


    return WindowSize;
}