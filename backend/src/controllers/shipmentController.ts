import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import {
	AuthenticatedRequest,
	ShipmentResponse,
	MedicationResponse,
} from '../types';
import { createError } from '../utils/error';

const prisma = new PrismaClient();

/**
 * Get all shipments for a user
 * @route GET /api/shipments
 */
export const getShipments = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (!req.user?.id) {
			throw createError.unauthorized('User not authenticated');
		}

		const userId = req.user.id;

		// Get all shipments for the user, ordered by date (most recent first)
		const shipments = await prisma.shipment.findMany({
			where: { userId },
			orderBy: { shipmentDate: 'desc' },
		});

		if (!shipments.length) {
			throw createError.notFound('No shipments found for user');
		}

		// Map to response format
		const response: ShipmentResponse[] = shipments.map((shipment) => ({
			id: shipment.id,
			medicationType: shipment.medicationType,
			dosage: shipment.dosage,
			shipmentDate: shipment.shipmentDate.toISOString(),
			status: shipment.status,
			trackingInfo: shipment.trackingInfo,
		}));

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

/**
 * Get current medication
 * @route GET /api/medication
 */
export const getCurrentMedication = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (!req.user?.id) {
			throw createError.unauthorized('User not authenticated');
		}

		const userId = req.user.id;

		// Get current medication (active as of today)
		const medication = await prisma.medication.findFirst({
			where: {
				userId,
				startDate: { lte: new Date() },
				OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
			},
		});

		if (!medication) {
			throw createError.notFound('No active medication found for user');
		}

		// Map to response format
		const response: MedicationResponse = {
			id: medication.id,
			type: medication.type,
			dosage: medication.dosage,
			startDate: medication.startDate.toISOString(),
			endDate: medication.endDate?.toISOString() || null,
		};

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
