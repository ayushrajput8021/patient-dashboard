import {
	User,
	WeightEntry,
	Shipment,
	Medication,
	DashboardSummary,
} from '../types';

// Mock data for development
const mockWeightHistory: WeightEntry[] = [
	{ weight: 180, bmi: 25.5, recordedAt: '2025-03-01' },
	{ weight: 178, bmi: 25.1, recordedAt: '2025-03-08' },
	{ weight: 176, bmi: 24.8, recordedAt: '2025-03-15' },
	{ weight: 175, bmi: 24.6, recordedAt: '2025-03-22' },
	{ weight: 173, bmi: 24.3, recordedAt: '2025-03-29' },
	{ weight: 171, bmi: 24.1, recordedAt: '2025-04-05' },
	{ weight: 170, bmi: 23.9, recordedAt: '2025-04-12' },
	{ weight: 168, bmi: 23.7, recordedAt: '2025-04-19' },
	{ weight: 167, bmi: 23.5, recordedAt: '2025-04-26' },
	{ weight: 165, bmi: 23.2, recordedAt: '2025-05-03' },
];

const mockShipments: Shipment[] = [
	{
		id: 'ship-001',
		medicationType: 'Weight Management Rx',
		dosage: '2.5mg',
		shipmentDate: '2025-04-05',
		status: 'Delivered',
		trackingInfo: 'USPS-12345678',
	},
	{
		id: 'ship-002',
		medicationType: 'Weight Management Rx',
		dosage: '2.5mg',
		shipmentDate: '2025-05-05',
		status: 'Processing',
		trackingInfo: 'Pending',
	},
	{
		id: 'ship-003',
		medicationType: 'Weight Management Rx',
		dosage: '5mg',
		shipmentDate: '2025-06-05',
		status: 'Processing',
		trackingInfo: 'Pending',
	},
	{
		id: 'ship-004',
		medicationType: 'Weight Management Rx',
		dosage: '5mg',
		shipmentDate: '2025-07-05',
		status: 'Processing',
		trackingInfo: 'Pending',
	},
	{
		id: 'ship-005',
		medicationType: 'Weight Management Rx',
		dosage: '7.5mg',
		shipmentDate: '2025-08-05',
		status: 'Processing',
		trackingInfo: 'Pending',
	},
];

const mockMedication: Medication = {
	type: 'Weight Management Rx',
	dosage: '2.5mg',
	startDate: '2025-04-05',
	endDate: '2025-08-05',
};

const mockDashboardSummary: DashboardSummary = {
	currentWeight: 165,
	bmi: 23.2,
	nextShipmentDate: '2025-05-05',
};

// API functions
export const api = {
	// Auth
	login: async (email: string): Promise<User> => {
		// In a real app, this would call the API and set cookies
		// For now, we mock it
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					id: 'user-123',
					email,
					name: 'John Doe',
				});
			}, 500);
		});
	},

	// Dashboard
	getDashboardSummary: async (): Promise<DashboardSummary> => {
		// In a real app, this would call the API
		// For now, we return mock data
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockDashboardSummary);
			}, 500);
		});
	},

	// Weight History
	getWeightHistory: async (): Promise<WeightEntry[]> => {
		// In a real app, this would call the API
		// For now, we return mock data
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockWeightHistory);
			}, 500);
		});
	},

	// Shipments
	getShipments: async (): Promise<Shipment[]> => {
		// In a real app, this would call the API
		// For now, we return mock data
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockShipments);
			}, 500);
		});
	},

	// Medication
	getMedication: async (): Promise<Medication> => {
		// In a real app, this would call the API
		// For now, we return mock data
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockMedication);
			}, 500);
		});
	},
};
