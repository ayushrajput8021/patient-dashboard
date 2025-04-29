import { useQuery } from '@tanstack/react-query';
import shipmentService, { Medication } from '../services/shipmentService';
import { useAuthStore } from '../store/useAuthStore';

export const useMedication = () => {
	const { isAuthenticated } = useAuthStore();

	const {
		data: medication,
		isLoading,
		error,
		refetch,
	} = useQuery<Medication>({
		queryKey: ['medication'],
		queryFn: shipmentService.getCurrentMedication,
		enabled: isAuthenticated, // Only run if the user is authenticated
		retry: 1,
	});

	return {
		medication,
		isLoading,
		error,
		refetch,
	};
};

export default useMedication;
