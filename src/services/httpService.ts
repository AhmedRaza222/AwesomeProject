import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add custom logic before the request is sent, e.g., authentication token
    console.log('Request:', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Add custom logic for successful responses
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Define HTTP methods
const http = {
  get: async (url: string, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  },

  post: async (url: string, payload: any) => {
    try {
      const response = await axiosInstance.post(url, payload);
      return response.data;
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  },

  put: async (url: string, payload: any) => {
    try {
      const response = await axiosInstance.put(url, payload);
      return response.data;
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  },

  delete: async (url: string) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  },
};

export default http;
