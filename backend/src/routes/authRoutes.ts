import { Router } from 'express';
import { login, logout } from '../controllers/authController';

const router: Router = Router();

// Auth routes
router.post('/login', login);
router.post('/logout', logout);

export default router;
