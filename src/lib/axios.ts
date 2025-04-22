import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Custom error logging function that works with Next.js
const logError = (message: string) => {
  if (typeof window !== 'undefined') {
    // Client-side logging
    window.console.error(message);
  } else {
    // Server-side logging
    console.error(message);
  }
};

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    try {
      // Handle token expiration
      if (error?.response?.status === 401 && error?.config && !error.config._retry) {
        error.config._retry = true;
        
        try {
          const refreshToken = useAuthStore.getState().refreshToken;
          if (refreshToken) {
            const response = await axios.post('/refresh', { refreshToken });
            const { token } = response.data;
            
            useAuthStore.getState().setToken(token);
            error.config.headers.Authorization = `Bearer ${token}`;
            return api(error.config);
          }
        } catch (refreshError) {
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }

      // Return error with details
      return Promise.reject({
        message: error?.message || 'Unknown error',
        status: error?.response?.status || 500,
        url: error?.config?.url || 'unknown',
        method: error?.config?.method || 'unknown'
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export default api; 