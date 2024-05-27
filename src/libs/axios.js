import axios from 'axios';
import { APP_MODE, APP_SERVER_URL } from '../configs';
import { pathGroup01, pathGroup02, pathGroup03, routeNames } from '@/router/settings';
import { clearStorage } from './storage-store';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = APP_SERVER_URL;
const service = axios.create({ baseURL: BASE_URL, timeout: 1000 * 100 });

service.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth') || null;
    const authInfo = auth ? JSON.parse(auth) : {};
    if (pathGroup01.includes(window.location.pathname) && authInfo?.roleType !== 1) {
      localStorage.setItem('TOKEN_CHANGE', true);
      window.location.replace(routeNames.apLoginPage.path);
      return;
    }
    if (pathGroup02.includes(window.location.pathname) && authInfo?.roleType !== 2) {
      localStorage.setItem('TOKEN_CHANGE', true);
      window.location.replace(routeNames.adSalesPersonLoginPage.path);
      return;
    }
    if (pathGroup03.includes(window.location.pathname) && authInfo?.roleType !== 3) {
      localStorage.setItem('TOKEN_CHANGE', true);
      window.location.replace(routeNames.adManagerLoginPage.path);
      return;
    }
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
    console.log(window.location.pathname);
    if (error.response.status === 401) {
      const token = localStorage.getItem('accessToken') || null;
      const payload = jwtDecode(token);
      clearStorage();
      const pathname = window.location.pathname;
      const pathSegments = pathname?.split('/').filter(Boolean);
      if (pathSegments.includes('manager')) {
        localStorage.setItem('TOKEN_INVALID', true);
        window.location.replace(routeNames.adManagerLoginPage.path);
      }
      if (pathSegments.includes('sales-person')) {
        localStorage.setItem('TOKEN_INVALID', true);
        if (payload?.type === 2) {
          window.location.replace(routeNames.adSalesPersonAzureLogout.path);
        } else {
          window.location.replace(routeNames.adSalesPersonLoginPage.path);
        }
      }
      if (!pathSegments.includes('manager') && !pathSegments.includes('sales-person')) {
        localStorage.setItem('TOKEN_INVALID', true);
        window.location.replace(routeNames.apLoginPage.path);
      }
    }
    if (APP_MODE === 'dev') console.log(error);
    return Promise.reject(error.response);
  }
);

export { service };
