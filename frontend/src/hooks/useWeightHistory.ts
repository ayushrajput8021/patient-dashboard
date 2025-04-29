import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import weightService, { WeightEntry } from '../services/weightService';
import { useAuthStore } from '../store/useAuthStore';

export const useWeightHistory = () => {
	const queryClient = useQueryClient();
	const { isAuthenticated } = useAuthStore();

	const {
		data: weightHistory,
		isLoading,
		error,
		refetch,
	} = useQuery<WeightEntry[]>({
		queryKey: ['weightHistory'],
		queryFn: weightService.getWeightHistory,
		enabled: isAuthenticated, // Only run if the user is authenticated
		retry: 1,
	});

	// This would be implemented if the backend supports adding weight entries
	const addWeightMutation = useMutation({
		mutationFn: (data: Omit<WeightEntry, 'id' | 'recordedAt'>) =>
			weightService.addWeightEntry(data),
		onSuccess: (newEntry) => {
			// Update cache with the new entry
			queryClient.setQueryData<WeightEntry[]>(
				['weightHistory'],
				(oldData = []) => [...oldData, newEntry]
			);
		},
	});

	return {
		weightHistory,
		isLoading,
		error,
		refetch,
		addWeight: addWeightMutation.mutate,
		isAdding: addWeightMutation.isPending,
		addError: addWeightMutation.error,
	};
};

export default useWeightHistory;
