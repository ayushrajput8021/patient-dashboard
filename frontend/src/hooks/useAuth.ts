import { useMutation, useQuery } from '@tanstack/react-query';
import authService, { LoginCredentials } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
	const {
		user,
		isAuthenticated,
		isLoading,
		error,
		setUser,
		setError,
		setLoading,
		logout: clearUser,
	} = useAuthStore();

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: (credentials: LoginCredentials) =>
			authService.login(credentials),
		onSuccess: (data) => {
			setUser(data.user);
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Logout mutation
	const logoutMutation = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			clearUser();
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Get current user query
	const { refetch: refetchUser } = useQuery({
		queryKey: ['currentUser'],
		queryFn: async () => {
			try {
				const user = await authService.getCurrentUser();
				setUser(user);
				return user;
			} catch (error) {
				clearUser();
				throw error;
			}
		},
		enabled: false, // Don't run automatically
		retry: false,
	});

	const login = async (credentials: LoginCredentials) => {
		setLoading(true);
		try {
			await loginMutation.mutateAsync(credentials);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await logoutMutation.mutateAsync();
		} finally {
			setLoading(false);
		}
	};

	return {
		user,
		isAuthenticated,
		isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
		error,
		login,
		logout,
		refetchUser,
	};
};

export default useAuth;
