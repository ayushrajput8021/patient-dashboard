import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, WeightEntryResponse } from '../types';
import { createError } from '../utils/error';

const prisma = new PrismaClient();

/**
 * Get weight history
 * @route GET /api/weight-history
 */
export const getWeightHistory = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		if (!req.user?.id) {
			throw createError.unauthorized('User not authenticated');
		}

		const userId = req.user.id;

		// Get all weight entries for the user, ordered by date
		const weightEntries = await prisma.weightEntry.findMany({
			where: { userId },
			orderBy: { recordedAt: 'asc' },
		});

		if (!weightEntries.length) {
			throw createError.notFound('No weight history found for user');
		}

		// Map to response format
		const response: WeightEntryResponse[] = weightEntries.map((entry) => ({
			id: entry.id,
			weight: entry.weight,
			bmi: entry.bmi,
			recordedAt: entry.recordedAt.toISOString(),
		}));

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
