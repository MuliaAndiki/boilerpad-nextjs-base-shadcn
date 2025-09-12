import AxiosClient from '@/utils/axios.client';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormLoginType, FormRegisterType } from '@/types/form';

class AuthApi {
  async Login(payload: FormLoginType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/login', payload);
    return res.data;
  }
  async Register(payload: FormRegisterType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/', payload);
    return res.data;
  }
  async Logout(): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/logout');
    return res.data;
  }
}

export default new AuthApi();
