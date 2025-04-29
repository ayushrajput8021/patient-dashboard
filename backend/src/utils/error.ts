import { Response } from 'express';
import { ApiError } from '../types';

/**
 * Handle API errors by sending appropriate response
 */
export const handleError = (err: Error | ApiError, res: Response): void => {
	console.error('Error:', err);

	if (err instanceof ApiError) {
		res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
		return;
	}

	// Default to 500 internal server error for unknown errors
	res.status(500).json({
		success: false,
		message: 'Internal server error',
	});
};

/**
 * Create common API errors
 */
export const createError = {
	badRequest: (message = 'Bad request'): ApiError => new ApiError(400, message),

	unauthorized: (message = 'Unauthorized'): ApiError =>
		new ApiError(401, message),

	forbidden: (message = 'Forbidden'): ApiError => new ApiError(403, message),

	notFound: (message = 'Resource not found'): ApiError =>
		new ApiError(404, message),

	internal: (message = 'Internal server error'): ApiError =>
		new ApiError(500, message),
};
