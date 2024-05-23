import axios from 'axios';
import { APP_MODE, APP_SERVER_URL } from '../configs';
import { routeNames } from '@/router/settings';
import { clearStorage } from './storage-store';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = APP_SERVER_URL;
const service = axios.create({ baseURL: BASE_URL, timeout: 1000 * 100 });

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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const token = localStorage.getItem('accessToken') || null;
      const payload = jwtDecode(token);
      clearStorage();
      if (payload?.role_type === 1) {
        localStorage.setItem('TOKEN_INVALID', true);
        window.location.href = routeNames.apLoginPage.path;
      }
      if (payload?.role_type === 2) {
        localStorage.setItem('TOKEN_INVALID', true);
        if (payload?.type === 2) {
          window.location.href = routeNames.adSalesPersonAzureLogout.path;
        } else {
          window.location.href = routeNames.adSalesPersonLoginPage.path;
        }
      }

      if (payload?.role_type === 3) {
        localStorage.setItem('TOKEN_INVALID', true);
        window.location.href = routeNames.adManagerLoginPage.path;
      }
    }
    if (APP_MODE === 'dev') console.log(error);
    return Promise.reject(error.response);
  }
);

export { service };
