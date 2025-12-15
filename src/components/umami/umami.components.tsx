import { useEffect } from 'react';

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  } else {
    if (import.meta.env.DEV) {
      console.log('[Dev] Umami Track:', eventName, eventData);
    }
  }
};

export const UmamiTracker = () => {
  useEffect(() => {
    const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;
    const websiteId = import.meta.env.VITE_UMAMI_ID;

    if (!scriptUrl || !websiteId) {return;}

    if (document.querySelector(`script[data-website-id="${websiteId}"]`)) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);

    document.head.appendChild(script);
  }, []);

  return null;
};