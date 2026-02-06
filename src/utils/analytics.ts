import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const logWebVital = (name: string, value: number, rating?: string) => {
    if (import.meta.env.DEV) {
        console.warn(`📊 Web Vital - ${name}: ${value.toFixed(2)}ms ${rating ? `(${rating})` : ''}`);
    }
};

/*
* Initialize Web Vitals tracking
*/
export const initWebVitals = () => {
    onLCP((metric) => {
        logWebVital('LCP', metric.value, metric.rating);
    });

    onCLS((metric) => {
        logWebVital('CLS', metric.value, metric.rating);
    });

    onINP((metric) => {
        logWebVital('INP', metric.value, metric.rating);
    });

    onTTFB((metric) => {
        logWebVital('TTFB', metric.value, metric.rating);
    });

    onFCP((metric) => {
        logWebVital('FCP', metric.value, metric.rating);
    });

    if (import.meta.env.DEV) {
        console.warn('✅ Web Vitals tracking initialized');
    }
};
