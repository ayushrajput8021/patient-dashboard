import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../services/authService';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	setUser: (user: User | null) => void;
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,
			setUser: (user) =>
				set({
					user,
					isAuthenticated: !!user,
					error: null,
				}),
			setError: (error) => set({ error }),
			setLoading: (isLoading) => set({ isLoading }),
			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					error: null,
				}),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
