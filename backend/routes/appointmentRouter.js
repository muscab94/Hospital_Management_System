import express from 'express';
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getDoctorAvailability,
  getAppointmentStats
} from '../controllers/appointmentController.js';

import { protect, authorize } from '../middleware/auth.js';
import auditLog from '../middleware/auditLog.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'receptionist'), getAppointments)
  .post(authorize('admin', 'receptionist'), auditLog('CREATE', 'APPOINTMENT'), createAppointment);

router.get('/stats', authorize('admin', 'doctor', 'receptionist'), getAppointmentStats);
router.get('/availability/:doctorId', authorize('admin', 'receptionist'), getDoctorAvailability);

router
  .route('/:id')
  .get(authorize('admin', 'doctor', 'receptionist'), auditLog('VIEW', 'APPOINTMENT'), getAppointment)
  .put(authorize('admin', 'doctor', 'receptionist'), auditLog('UPDATE', 'APPOINTMENT'), updateAppointment)
  .delete(authorize('admin', 'doctor', 'receptionist'), auditLog('DELETE', 'APPOINTMENT'), cancelAppointment);

export default router;
