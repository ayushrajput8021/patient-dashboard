import { Router } from 'express';
import { getWeightHistory } from '../controllers/weightController';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = Router();

// Weight routes (protected)
router.get('/', authenticate, getWeightHistory);

export default router;
