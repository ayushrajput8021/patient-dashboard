import api from './api';

export interface Shipment {
	id: number;
	medicationType: string;
	dosage: string;
	shipmentDate: string;
	status: string;
	trackingInfo: string | null;
}

export interface Medication {
	id: number;
	type: string;
	dosage: string;
	startDate: string;
	endDate: string | null;
}

export const shipmentService = {
	getShipments: async (): Promise<Shipment[]> => {
		const response = await api.get<Shipment[]>('/shipments');
		return response.data;
	},

	getCurrentMedication: async (): Promise<Medication> => {
		const response = await api.get<Medication>('/medication');
		return response.data;
	},
};

export default shipmentService;
