import { IApiResponse } from '../interface/api.interface';
import { apiClient } from '../AxiosClient';

export async function sendEmail(formData: any): Promise<IApiResponse | null> {
    try {
        const response = await apiClient.post('/mail/sendEmail', formData);
        return response.data;
    } catch (err) {
        throw err;
    }
}
