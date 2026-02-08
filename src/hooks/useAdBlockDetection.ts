import { useEffect, useState } from 'react';
/*
* try to fetch a known ad-serving domain (DoubleClick) with no-cors and check if it was blocked or redirected.
* if block not load any tracking script.
* orignal idea: https://github.com/aruniverse/adblock-detect-react/blob/master/adblock-detect-react/src/hooks/useDetectAdBlock.ts
*/
export const useAdBlockDetection = () => {
    const [adBlockDetected, setAdBlockDetected] = useState<boolean | null>(null);

    useEffect(() => {
        const url = 'https://www3.doubleclick.net';

        fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
        })
            .then(({ redirected }) => {
                if (redirected) {
                    console.log('%c✅ Bloqueur de pub détecté. Analytics désactivé.', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
                    setAdBlockDetected(true);
                } else {
                    setAdBlockDetected(false);
                }
            })
            .catch(() => {
                console.log('%c✅ Bloqueur de pub détecté. Analytics désactivé.', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
                setAdBlockDetected(true);
            });
    }, []);

    return adBlockDetected;
};
