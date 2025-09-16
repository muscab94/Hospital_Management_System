import express from 'express';
import { getReport } from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Only admin and receptionist can view full report
router.get('/', authorize('admin', 'receptionist'), getReport);

export default router;
