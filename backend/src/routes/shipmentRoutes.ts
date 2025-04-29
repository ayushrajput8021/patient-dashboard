import { Router } from 'express';
import {
	getShipments,
	getCurrentMedication,
} from '../controllers/shipmentController';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = Router();

// Shipment routes (protected)
router.get('/shipments', authenticate, getShipments);
router.get('/medication', authenticate, getCurrentMedication);

export default router;
