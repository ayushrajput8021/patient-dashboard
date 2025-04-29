import api from './api';

export interface WeightEntry {
	id: number;
	weight: number;
	bmi: number;
	recordedAt: string;
}

export const weightService = {
	getWeightHistory: async (): Promise<WeightEntry[]> => {
		const response = await api.get<WeightEntry[]>('/weight-history');
		return response.data;
	},

	// This method would be implemented if the backend supports adding weight entries
	addWeightEntry: async (
		data: Omit<WeightEntry, 'id' | 'recordedAt'>
	): Promise<WeightEntry> => {
		const response = await api.post<WeightEntry>('/weight-history', data);
		return response.data;
	},
};

export default weightService;
