import api from './api';
import { User } from './authService';

export interface UserDetails extends User {
	address?: string;
	phone?: string;
	birthdate?: string;
	patientId?: string;
	medicalHistory?: {
		condition: string;
		diagnosedDate: string;
		notes: string;
	}[];
}

export const userService = {
	getUserDetails: async (userId: string): Promise<UserDetails> => {
		const response = await api.get<UserDetails>(`/dashboard/user/${userId}`);
		return response.data;
	},

	updateUserDetails: async (
		userId: string,
		data: Partial<UserDetails>
	): Promise<UserDetails> => {
		const response = await api.put<UserDetails>(
			`/dashboard/user/${userId}`,
			data
		);
		return response.data;
	},
};

export default userService;
