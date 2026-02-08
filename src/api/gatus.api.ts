import axios from 'axios';
import { ApiBaseUrl } from '@/config';

export interface GatusResult {
    status: number;
    success: boolean;
    timestamp: string;
    duration: number;
}

export interface GatusEndpoint {
    name: string;
    group: string;
    key: string;
    results: GatusResult[];
}

const logDev = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.warn(...args);
};

export const fetchGatusEndpoints = async (): Promise<GatusEndpoint[]> => {
    try {
        const response = await axios.get<GatusEndpoint[]>(`${ApiBaseUrl}/gatus/endpoints`);
        return response.data;
    } catch (error) {
        logDev('Failed to fetch Gatus endpoints:', error);
        throw error;
    }
};

export const fetchGatusEndpoint = async (key: string): Promise<GatusEndpoint | null> => {
    try {
        const response = await axios.get<GatusEndpoint[]>(`${ApiBaseUrl}/gatus/endpoints`);
        const endpoint = response.data.find(e => e.key === key);
        return endpoint || null;
    } catch (error) {
        logDev(`Failed to fetch Gatus endpoint [${key}]:`, error);
        return null;
    }
};

export const getEndpointStatus = (endpoint: GatusEndpoint): 'online' | 'offline' | 'maintenance' => {
    if (!endpoint.results || endpoint.results.length === 0) {
        return 'offline';
    }

    const recentResults = endpoint.results.slice(-3);
    const failedResults = recentResults.filter(r => !r.success);

    if (failedResults.length === recentResults.length) {
        return 'offline';
    }

    if (failedResults.length > 0) {
        return 'maintenance';
    }

    return 'online';
};

export const calculateUptime = (endpoint: GatusEndpoint): number => {
    if (!endpoint.results || endpoint.results.length === 0) {
        return 0;
    }

    const successful = endpoint.results.filter(r => r.success).length;
    return Math.round((successful / endpoint.results.length) * 100);
};

export const getLastCheck = (endpoint: GatusEndpoint): string => {
    if (!endpoint.results || endpoint.results.length === 0) {
        return 'N/A';
    }

    const lastResult = endpoint.results[endpoint.results.length - 1];
    const date = new Date(lastResult.timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'à l\'instant';
    if (diffMins < 60) return `il y a ${diffMins}m`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `il y a ${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    return `il y a ${diffDays}j`;
};
