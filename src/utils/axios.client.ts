import axios, { AxiosResponse, AxiosError } from 'axios';
import { store } from '@/src/stores/store';
import { env } from '../config/env.config';

const AxiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_ID,
});

AxiosClient.interceptors.request.use(
  (config: any): any => {
    const token = store.getState().auth.currentUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (reponse: AxiosResponse): AxiosResponse => {
    return reponse;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
