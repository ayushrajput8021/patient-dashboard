import { useQuery } from '@tanstack/react-query';
import shipmentService, { Shipment } from '../services/shipmentService';
import { useAuthStore } from '../store/useAuthStore';

export const useShipments = () => {
	const { isAuthenticated } = useAuthStore();

	const {
		data: shipments,
		isLoading,
		error,
		refetch,
	} = useQuery<Shipment[]>({
		queryKey: ['shipments'],
		queryFn: shipmentService.getShipments,
		enabled: isAuthenticated, // Only run if the user is authenticated
		retry: 1,
	});

	return {
		shipments,
		isLoading,
		error,
		refetch,
	};
};

export default useShipments;
