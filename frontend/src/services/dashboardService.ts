import api from './api';

export interface DashboardData {
	currentWeight: number;
	bmi: number;
	nextShipmentDate: string | null;
}

export const dashboardService = {
	getDashboardOverview: async (): Promise<DashboardData> => {
		const response = await api.get<DashboardData>('/dashboard');
		return response.data;
	},
};

export default dashboardService;
