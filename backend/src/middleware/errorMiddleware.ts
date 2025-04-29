import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/error';
import { ApiError } from '../types';

/**
 * Global error handler middleware
 */
export const errorHandler = (
	err: Error | ApiError,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	handleError(err, res);
};

/**
 * 404 Not Found middleware
 */
export const notFoundHandler = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const err = new ApiError(404, `Resource not found - ${req.originalUrl}`);
	next(err);
};
