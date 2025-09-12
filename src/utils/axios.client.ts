import axios, { AxiosResponse, AxiosError } from 'axios';
import { store } from '@/stores/store';
import { env } from '../configs/env.config';

const AxiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

AxiosClient.interceptors.request.use(
  (config: any): any => {
    const token = store.getState().auth.currentUser?.user.token;
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
