import { useEffect, useRef } from 'react';
import { useAdBlockDetection } from '@/hooks/useAdBlockDetection';

export const trackEvent = (
    eventName: string,
    eventData: Record<string, any> = {},
) => {
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, eventData);
    }
};

export const UmamiTracker = () => {
    const isAdBlockDetected = useAdBlockDetection();
    const initDone = useRef(false);

    useEffect(() => {
        if (isAdBlockDetected === null) return;

        if (isAdBlockDetected) return;

        if (initDone.current) return;
        initDone.current = true;

        const detectAndLoad = async () => {
            const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;
            const websiteId = import.meta.env.VITE_UMAMI_ID;

            if (!scriptUrl || !websiteId) return;

            if (document.querySelector(`script[data-website-id="${websiteId}"]`)) return;

            const script = document.createElement('script');
            script.defer = true;
            script.src = scriptUrl;
            script.setAttribute('data-website-id', websiteId);

            script.onerror = (e) => {
                if (typeof e !== 'string' && e.target instanceof Element) e.target.remove();
            };

            document.head.appendChild(script);
        };

        detectAndLoad();
    }, [isAdBlockDetected]);

    return null;
};