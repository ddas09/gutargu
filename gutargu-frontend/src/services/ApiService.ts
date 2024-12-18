import { toast } from 'react-toastify';
import { CustomResponse } from '../models/CustomResponse';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    const status = error?.response?.data?.status || 'bad_request';
    const message = error?.response?.data?.message || error.message || 'Something went wrong.';

    toast.error(message);

    // fallback to retrun a common response format
    return Promise.resolve({
      data: {
        data: null,
        status: status,
        message: message,
      }
    });
  }
);

const apiService = {
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<CustomResponse<T>> => {
    try {
      const response = await apiClient.get<CustomResponse<T>>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<CustomResponse<T>> => {
    try {
      const config = {
        headers: {
          ...headers,
        },
      };

      const response = await apiClient.post<CustomResponse<T>>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async <T>(endpoint: string, data: any): Promise<CustomResponse<T>> => {
    try {
      const response = await apiClient.put<CustomResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>(endpoint: string): Promise<CustomResponse<T>> => {
    try {
      const response = await apiClient.delete<CustomResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
