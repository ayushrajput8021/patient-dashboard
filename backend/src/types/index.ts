import { Request } from 'express';
import { User, WeightEntry, Shipment, Medication } from '@prisma/client';

// Request Extensions
export interface AuthenticatedRequest extends Request {
	user?: {
		id: number;
		email: string;
		name: string;
	};
}

// Authentication Types
export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: number;
		email: string;
		name: string;
	};
}

// Dashboard Types
export interface DashboardResponse {
	currentWeight: number;
	bmi: number;
	nextShipmentDate: string | null;
}

// Weight Entry Types
export interface WeightEntryResponse {
	id: number;
	weight: number;
	bmi: number;
	recordedAt: string;
}

// Shipment Types
export interface ShipmentResponse {
	id: number;
	medicationType: string;
	dosage: string;
	shipmentDate: string;
	status: string;
	trackingInfo: string | null;
}

// Medication Types
export interface MedicationResponse {
	id: number;
	type: string;
	dosage: string;
	startDate: string;
	endDate: string | null;
}

// Error Types
export class ApiError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = 'ApiError';
	}
}

// JWT Payload Type
export interface JwtPayload {
	userId: number;
	email: string;
	name: string;
	iat?: number;
	exp?: number;
}
