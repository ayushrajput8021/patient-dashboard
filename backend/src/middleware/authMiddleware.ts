import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { createError } from '../utils/error';
import { AuthenticatedRequest } from '../types';

/**
 * Middleware to protect routes that require authentication
 */
export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		// Get token from cookie
		const token = req.cookies?.token;

		if (!token) {
			throw createError.unauthorized('Authentication required');
		}

		// Verify the token
		const decoded = verifyToken(token);

		// Attach user info to request
		(req as AuthenticatedRequest).user = {
			id: decoded.userId,
			email: decoded.email,
			name: decoded.name,
		};

		next();
	} catch (error) {
		res.clearCookie('token');
		res.status(401).json({
			success: false,
			message: 'Authentication failed. Please log in again.',
		});
	}
};
