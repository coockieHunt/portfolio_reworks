import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    triggerOnce?: boolean;
    threshold?: number | number[];
    rootMargin?: string;
    initialInView?: boolean;
    skip?: boolean;
}

interface UseInViewReturn {
    ref: React.RefObject<HTMLElement | null>;
    inView: boolean;
}

/**
 * IntersectionObserver hook - detects when an element enters the viewport
 * @param {Object} options - Configuration options for the hook
 * @param {boolean} [options.triggerOnce=true] - Whether to trigger only once when the element comes into view
 * @param {number|number[]} [options.threshold=0.1] - Intersection threshold(s) for triggering inView
 * @param {string} [options.rootMargin='0px'] - Margin around the root for intersection calculations
 * @param {boolean} [options.initialInView=false] - Initial inView state before observation
 * @param {boolean} [options.skip=false] - Whether to skip observing the element
 * @returns {Object} - An object containing the ref to attach to the element and the inView boolean
 */
export const useInView = ({
    triggerOnce = true,
    threshold = 0.1,
    rootMargin = '0px',
    initialInView = false,
    skip = false,
}: UseInViewOptions = {}): UseInViewReturn => {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(initialInView);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (skip || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        hasTriggeredRef.current = true;
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            {
                threshold,
                rootMargin,
            },
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [skip, threshold, rootMargin, triggerOnce]);

    return { ref, inView };
};
