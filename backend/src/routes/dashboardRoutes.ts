import { Router } from 'express';
import { getDashboardOverview } from '../controllers/dashboardController';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = Router();

// Dashboard routes (protected)
router.get('/', authenticate, getDashboardOverview);

export default router;
