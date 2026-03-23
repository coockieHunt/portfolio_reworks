import { apiClient } from '../AxiosClient';
import { isApiDown, setApiDown } from '../apiHealth';
import { IGatusEndpoint } from '../interface/api.interface';

export const fetchGatusEndpoints = async (): Promise<IGatusEndpoint[]> => {
    if (typeof window !== 'undefined' && isApiDown()) {
        return [];
    }
    try {
        const response = await apiClient.get<IGatusEndpoint[]>('/gatus/endpoints');
        setApiDown(false);
        return response.data;
    } catch (error) {
        setApiDown(true);
        return [];
    }
};

export const fetchGatusEndpoint = async (key: string): Promise<IGatusEndpoint | null> => {
    if (typeof window !== 'undefined' && isApiDown()) {
        return null;
    }
    try {
        const response = await apiClient.get<IGatusEndpoint[]>('/gatus/endpoints');
        setApiDown(false);
        const endpoint = response.data.find(e => e.key === key);
        return endpoint || null;
    } catch (error) {
        setApiDown(true);
        return null;
    }
};

export const getEndpointStatus = (endpoint: IGatusEndpoint): 'online' | 'offline' | 'maintenance' => {
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

export const calculateUptime = (endpoint: IGatusEndpoint): number => {
    if (!endpoint.results || endpoint.results.length === 0) {
        return 0;
    }

    const successful = endpoint.results.filter(r => r.success).length;
    return Math.round((successful / endpoint.results.length) * 100);
};

export const getLastCheck = (endpoint: IGatusEndpoint): string => {
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
