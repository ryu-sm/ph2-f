import axios from 'axios';
import { APP_MODE, APP_SERVER_URL } from '../configs';

const BASE_URL = APP_SERVER_URL;
const service = axios.create({ baseURL: BASE_URL, timeout: 1000 * 5 });

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || null;
    if (token) {
      config.headers['Authorization'] = token;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  (error) => {
    if (APP_MODE === 'dev') console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (APP_MODE === 'dev') console.log(error);
    return Promise.reject(error.response);
  }
);

export { service };
