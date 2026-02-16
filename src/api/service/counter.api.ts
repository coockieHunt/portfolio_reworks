import { IApiResponse, ICounterRequest } from '../interface/api.interface';
import { apiClient } from '../AxiosClient';

export async function getCounter({counterName}: ICounterRequest): Promise<IApiResponse | null> {
    try {
        const resp = await apiClient.get<IApiResponse>(`/counter/${counterName}`);
        return resp.data.data.counterValue !== undefined ? resp.data : null;
    } catch (err) {
        throw err;
    }
}

export async function incrementCounter({counterName}: ICounterRequest): Promise<IApiResponse | null> {
    try {
        const resp = await apiClient.post<IApiResponse>(
            `/counter/${counterName}/increment`,
        );
        return resp.data;
    } catch (err) {
        throw err;
    }
}