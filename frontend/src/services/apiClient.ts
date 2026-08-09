import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Get base URL from environment variable or default to /api/v1
const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1';

// Create Axios Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
});

// Automatic Request Interceptor: Attach JWT Token from localStorage if present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('rr_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access (401). Clearing stale token.');
      localStorage.removeItem('rr_auth_token');
      localStorage.removeItem('rr_user_session');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
