import api from './api';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface User {
	id: string;
	email: string;
	name: string;
	role: string;
}

export interface AuthResponse {
	user: User;
	token?: string;
}

export const authService = {
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		const payload = {
			email: credentials.email,
			password: credentials.password,
		};
		const response = await api.post<AuthResponse>('/auth/login', payload);
		return response.data;
	},

	logout: async (): Promise<void> => {
		await api.post('/auth/logout');
	},

	getCurrentUser: async (): Promise<User> => {
		const response = await api.get<User>('/auth/me');
		return response.data;
	},
};

export default authService;
