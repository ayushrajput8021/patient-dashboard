import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userService, { UserDetails } from '../services/userService';
import { useAuthStore } from '../store/useAuthStore';

export const useGetUser = (userId?: string) => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();

	// Use the authenticated user's ID if no userId is provided
	const targetUserId = userId || user?.id;

	const {
		data: userDetails,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['userDetails', targetUserId],
		queryFn: () => userService.getUserDetails(targetUserId as string),
		enabled: !!targetUserId, // Only run if we have a userId
	});

	const updateUserMutation = useMutation({
		mutationFn: (data: Partial<UserDetails>) =>
			userService.updateUserDetails(targetUserId as string, data),
		onSuccess: (updatedUser) => {
			// Update cache with the new data
			queryClient.setQueryData(['userDetails', targetUserId], updatedUser);
		},
	});

	return {
		userDetails,
		isLoading,
		error,
		refetch,
		updateUser: updateUserMutation.mutate,
		isUpdating: updateUserMutation.isPending,
		updateError: updateUserMutation.error,
	};
};

export default useGetUser;
