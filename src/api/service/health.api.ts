import { apiClient } from '../AxiosClient';
import { isApiDown, setApiDown } from '../apiHealth';
import { IHealthCheckResponse } from '../interface/api.interface';

export async function getHealthStatus(): Promise<IHealthCheckResponse | null> {
	if (typeof window !== 'undefined' && isApiDown()) {
		return null;
	}
	try {
		const resp = await apiClient.get<IHealthCheckResponse>('/health/');
		setApiDown(false);
		return resp.data;
	} catch (err) {
		setApiDown(true);
		return null;
	}
}
