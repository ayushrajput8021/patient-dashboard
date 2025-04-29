import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, DashboardResponse } from '../types';
import { createError } from '../utils/error';

const prisma = new PrismaClient();

/**
 * Get dashboard overview
 * @route GET /api/dashboard
 */
export const getDashboardOverview = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (!req.user?.id) {
			throw createError.unauthorized('User not authenticated');
		}

		const userId = req.user.id;

		// Get latest weight entry
		const latestWeightEntry = await prisma.weightEntry.findFirst({
			where: { userId },
			orderBy: { recordedAt: 'desc' },
		});

		// Get next shipment
		const nextShipment = await prisma.shipment.findFirst({
			where: {
				userId,
				shipmentDate: { gt: new Date() },
				status: { in: ['Pending', 'Shipped'] },
			},
			orderBy: { shipmentDate: 'asc' },
		});

		if (!latestWeightEntry) {
			throw createError.notFound('No weight data found for user');
		}

		// Build response
		const response: DashboardResponse = {
			currentWeight: latestWeightEntry.weight,
			bmi: latestWeightEntry.bmi,
			nextShipmentDate: nextShipment?.shipmentDate.toISOString() || null,
		};

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
