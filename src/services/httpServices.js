import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const get = async (url, config) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

const post = async (url, data, config) => {
  const response = await axiosInstance.post(url, data, config);
  return response.data;
};

const put = async (url, data, config) => {
  const response = await axiosInstance.put(url, data, config);
  return response.data;
};

const del = async (url, config) => {
  const response = await axiosInstance.delete(url, config);
  return response.data;
};

export const httpService = {
  get,
  post,
  put,
  delete: del,
};
