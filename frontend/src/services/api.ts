import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const isDev = import.meta.env.MODE === 'development';

const apiClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
apiClient.interceptors.request.use(
	(config) => {
		// Log request in development
		if (isDev) {
			console.log('API Request:', {
				url: config.url,
				method: config.method,
				data: config.data,
			});
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
apiClient.interceptors.response.use(
	(response) => {
		// Log response in development
		if (isDev) {
			console.log('API Response:', {
				url: response.config.url,
				status: response.status,
				data: response.data,
			});
		}
		return response;
	},
	(error) => {
		// Log error in development
		if (isDev) {
			console.error('API Error:', {
				url: error.config?.url,
				message: error.message,
				response: error.response?.data,
			});
		}
		return Promise.reject(error);
	}
);

export const api = {
	get: <T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiClient.get<T>(url, config);
	},
	post: <T>(
		url: string,
		data?: Record<string, unknown>,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiClient.post<T>(url, data, config);
	},
	put: <T>(
		url: string,
		data?: Record<string, unknown>,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiClient.put<T>(url, data, config);
	},
	delete: <T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiClient.delete<T>(url, config);
	},
};

export default api;
