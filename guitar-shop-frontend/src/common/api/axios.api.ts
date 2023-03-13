import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { ConstantValueEnum } from '../enum/constant-value.enum';

export const BACKEND_URL = 'http://localhost:20006/api';
const REQUEST_TIMEOUT = 5000;

export const axiosApi = ((): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = sessionStorage.getItem(ConstantValueEnum.ACCESS_TOKEN);

      if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  return api;
})();
