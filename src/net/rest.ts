import { API_URL } from '../constants/API';
import { AxiosRequestConfig } from 'axios';
import baseAxios from './interceptor';

export const get = async <T, E>(requestUrl: string, data: T, options?: AxiosRequestConfig) => {
  const response = await baseAxios.get(`${API_URL}${requestUrl}`, {
    ...options,
    data,
  });
  return response;
};

export const post = async <T, E>(requestUrl: string, data: T, options?: AxiosRequestConfig) => {
  const response = await baseAxios.post(`${API_URL}${requestUrl}`, data, options);
  return response;
};
