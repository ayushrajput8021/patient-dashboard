import { useQuery } from '@tanstack/react-query';
import dashboardService, { DashboardData } from '../services/dashboardService';
import { useAuthStore } from '../store/useAuthStore';

export const useDashboard = () => {
	const { isAuthenticated } = useAuthStore();

	const {
		data: dashboardData,
		isLoading,
		error,
		refetch,
	} = useQuery<DashboardData>({
		queryKey: ['dashboard'],
		queryFn: dashboardService.getDashboardOverview,
		enabled: isAuthenticated, // Only run if the user is authenticated
		retry: 1,
	});

	return {
		dashboardData,
		isLoading,
		error,
		refetch,
	};
};

export default useDashboard;
