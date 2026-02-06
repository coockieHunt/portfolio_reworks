import { useState, useEffect } from 'react';

declare global {
    const __APP_BUILD_TIME__: number;
}

/**
 * Custom hook to calculate and format application uptime since build time.
 */
export const useAppUptime = () => {
    const buildTime = __APP_BUILD_TIME__;
    const [uptime, setUptime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
    });

    useEffect(() => {
        const calculateUptime = () => {
            const now = Date.now();
            const diff = now - buildTime;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setUptime({ days, hours, minutes, seconds, totalMs: diff });
        };

        calculateUptime();
        const interval = setInterval(calculateUptime, 1000);

        return () => clearInterval(interval);
    }, [buildTime]);

    const formatUptime = () => {
        const { days, hours, minutes, seconds } = uptime;
        return `${days}j ${hours}h ${minutes}m ${seconds}s`;
    };

    return { uptime, formatUptime };
};
