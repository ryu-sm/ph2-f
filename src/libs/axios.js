import axios from 'axios';

const BASE_URL = 'http://54.178.88.84/api';
const service = axios.create({ baseURL: BASE_URL, timeout: 1000 * 3 });

service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken') || null;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
