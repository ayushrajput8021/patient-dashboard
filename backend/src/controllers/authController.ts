import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { createError } from '../utils/error';
import { LoginRequest, LoginResponse } from '../types';

const prisma = new PrismaClient();

/**
 * Login a user
 * @route POST /api/auth/login
 */
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password } = req.body as LoginRequest;

		// Validate request
		if (!email || !password) {
			throw createError.badRequest('Email and password are required');
		}

		// Find user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw createError.unauthorized('Invalid credentials');
		}

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw createError.unauthorized('Invalid credentials');
		}

		// Generate JWT token
		const token = generateToken({
			userId: user.id,
			email: user.email,
			name: user.name,
		});

		// Set cookie with token
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 1000, // 1 hour
		});

		// Send response
		const response: LoginResponse = {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		};

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

/**
 * Logout a user
 * @route POST /api/auth/logout
 */
export const logout = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		res.clearCookie('token');
		res.status(200).json({ success: true, message: 'Logged out successfully' });
	} catch (error) {
		next(error);
	}
};
