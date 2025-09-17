import express from 'express';
import {
  getMedicalRecords,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  getPatientMedicalHistory,
  addLabTest,
  getMedicalRecordStats
} from '../controllers/medicalRecordController.js';

import { protect, authorize } from '../middleware/auth.js';
import auditLog from '../middleware/auditLog.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor'), getMedicalRecords)
  .post(authorize('doctor'), auditLog('CREATE', 'MEDICAL_RECORD'), createMedicalRecord);

router.get('/stats', authorize('admin', 'doctor'), getMedicalRecordStats);
router.get(
  '/patient/:patientId',
  authorize('admin', 'doctor'),
  auditLog('VIEW', 'MEDICAL_RECORD'),
  getPatientMedicalHistory
);

router
  .route('/:id')
  .get(authorize('admin', 'doctor'), auditLog('VIEW', 'MEDICAL_RECORD'), getMedicalRecord)
  .put(authorize('doctor'), auditLog('UPDATE', 'MEDICAL_RECORD'), updateMedicalRecord);

router.post('/:id/lab-tests', authorize('doctor'), auditLog('UPDATE', 'MEDICAL_RECORD'), addLabTest);

export default router;
