import { Hand } from "./style/HellowHand.style"
import React, {useState, useEffect} from "react"

/**
 * HelloHandComponent
 * 
 * This component renders a waving hand emoji that pulses when hovered over.
 * It also randomly waves every 2 to 5 seconds.
 * 
 */
export const HelloHandComponent = () => {
    const [isHello, setIsHello] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer;
        let animationTimeOut;

        const RandomHello  = () => {
            const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2s and 5s

            timer = setTimeout(() => {
                setIsHello(true);
                animationTimeOut = setTimeout(() => {
                    setIsHello(false);
                    RandomHello();
                }, 2500);
            }, randomDelay);

        }

        RandomHello();

        return () => {
            clearTimeout(timer);
            clearTimeout(animationTimeOut);
        }
    }, []);
    
    
    const triggerHello = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsHello(true);

        setTimeout(() => {
            setIsHello(false);
            setIsAnimating(false);
        }, 2500); 
    };

    return(
        <Hand 
            $IsRandHello={isHello}
            onMouseOver={triggerHello}
        >🖐️</Hand>
    )
}