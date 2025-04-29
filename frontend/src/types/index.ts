export interface User {
	id: string;
	email: string;
	name: string;
}

export interface WeightEntry {
	weight: number;
	bmi: number;
	recordedAt: string;
}

export interface Shipment {
	id: string;
	medicationType: string;
	dosage: string;
	shipmentDate: string;
	status: 'Shipped' | 'Processing' | 'Delivered';
	trackingInfo: string;
}

export interface Medication {
	type: string;
	dosage: string;
	startDate: string;
	endDate: string;
}

export interface DashboardSummary {
	currentWeight: number;
	bmi: number;
	nextShipmentDate: string;
}
