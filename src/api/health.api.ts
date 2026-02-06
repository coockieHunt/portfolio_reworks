import axios from 'axios';
import { ApiBaseUrl } from '../config';

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
    uptime: number;
    timestamp: string;
    database: string;
    redis: string;
    mail: string;
  };
  timestamp: string;
}

const logDev = (...args: unknown[]) => {
  if (import.meta.env.DEV) console.warn(...args);
};

export async function getHealthStatus(): Promise<HealthCheckResponse | null> {
  try {
    const resp = await axios.get<HealthCheckResponse>(`${ApiBaseUrl}/health/`);
    return resp.data;
  } catch (err) {
    logDev('getHealthStatus error', err);
    return null;
  }
}
