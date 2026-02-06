import { useState, useEffect } from 'react';
import { getHealthStatus } from '@/api/health.api';

/** 
* Custom hook to monitor the health status of an external API.
* It fetches the API status at regular intervals and provides uptime, status, last fetch time, and service statuses.
*/
export const useApiHealth = () => {
    const CHECK_TIME_MS = 600000; // 10 minutes
    const [apiUptime, setApiUptime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalMs: 0,
    });
    const [apiStatus, setApiStatus] = useState<
        'online' | 'offline' | 'maintenance'
    >('offline');
    const [lastFetch, setLastFetch] = useState<string>('');
    const [services, setServices] = useState({
        database: 'UP',
        redis: 'UP',
        mail: 'UP',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const data = await getHealthStatus();

                if (data?.success && data.data) {
                    const uptimeMs = data.data.uptime * 1000;

                    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (uptimeMs / (1000 * 60 * 60)) % 24,
                    );
                    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
                    const seconds = Math.floor((uptimeMs / 1000) % 60);

                    setApiUptime({
                        days,
                        hours,
                        minutes,
                        seconds,
                        totalMs: uptimeMs,
                    });
                    setApiStatus('online');
                    setLastFetch(new Date(data.data.timestamp).toISOString());
                    setServices({
                        database: data.data.database,
                        redis: data.data.redis,
                        mail: data.data.mail,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch API health:', error);
                setApiStatus('offline');
            } finally {
                setLoading(false);
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, CHECK_TIME_MS);

        return () => clearInterval(interval);
    }, []);

    const formatApiUptime = () => {
        const { days, hours, minutes, seconds } = apiUptime;
        return `${days}j ${hours}h ${minutes}m ${seconds}s`;
    };

    return {
        apiUptime,
        apiStatus,
        formatApiUptime,
        lastFetch,
        loading,
        services,
    };
};
