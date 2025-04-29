import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const JWT_SECRET =
	process.env.JWT_SECRET || 'fallback-secret-for-development-only';
const JWT_EXPIRE = '1h'; // 1 hour

/**
 * Generate a JWT token
 */
export const generateToken = (
	payload: Omit<JwtPayload, 'iat' | 'exp'>
): string => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

/**
 * Verify a JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
	try {
		return jwt.verify(token, JWT_SECRET) as JwtPayload;
	} catch (error) {
		throw new Error('Invalid or expired token');
	}
};
