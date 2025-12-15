import { Hand } from "./HellowHand.style"
import  {useState, useEffect} from "react"
import { JSX } from "react";

/**
 * HelloHandComponent
 * 
 * This component renders a waving hand emoji that pulses when hovered over.
 * It also randomly waves every 2 to 5 seconds.
 * 
 */

export const HelloHandComponent = () : JSX.Element => {
    let [isHello, setIsHello] = useState<boolean>(false);
    let [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        let animationTimeOut: ReturnType<typeof setTimeout>;

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