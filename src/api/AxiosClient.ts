import axios from 'axios';
import { ApiBaseUrl } from '@/config';
import { setApiDown } from './apiHealth';

export const apiClient = axios.create({
    baseURL: ApiBaseUrl,
});

apiClient.interceptors.response.use(
    (response) => {
        if (typeof window !== 'undefined') {
            setApiDown(false);
        }
        return response;
    },
    (error) => {
        if (typeof window !== 'undefined') {
            const status = error?.response?.status;
            if (status === 429) {
                return Promise.resolve({
                    data: {
                        error: true,
                        message: 'Serveur surchargé. Veuillez réessayer dans quelques minutes.',
                        status: 429,
                    },
                    status: 429,
                    statusText: 'Too Many Requests',
                    headers: error?.response?.headers ?? {},
                    config: error?.config ?? {},
                    request: error?.request,
                });
            }
            if (!status || status >= 500) {
                setApiDown(true);
            }
        }
        return Promise.reject(error);
    }
);

