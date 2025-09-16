import express from 'express';
import {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients,
  getPatientStats
} from '../controllers/patientController.js';

import { protect, authorize } from '../middleware/auth.js';
import auditLog from '../middleware/auditLog.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'receptionist'), getPatients)
  .post(authorize('admin', 'receptionist'), auditLog('CREATE', 'PATIENT'), createPatient);

router.get('/stats', authorize('admin', 'receptionist'), getPatientStats);
router.get('/search/:term', authorize('admin', 'doctor', 'receptionist'), searchPatients);

router
  .route('/:id')
  .get(authorize('admin', 'doctor', 'receptionist'), auditLog('VIEW', 'PATIENT'), getPatient)
  .put(authorize('admin', 'receptionist'), auditLog('UPDATE', 'PATIENT'), updatePatient)
  .delete(authorize('admin'), auditLog('DELETE', 'PATIENT'), deletePatient);

// router
//   .route("/")
//   .get(getPatients) // no role restriction
//   .post(auditLog("CREATE", "PATIENT"), createPatient);

// router.get("/stats", getPatientStats);
// router.get("/search/:term", searchPatients);

// router
//   .route("/:id")
//   .get(auditLog("VIEW", "PATIENT"), getPatient)
//   .put(auditLog("UPDATE", "PATIENT"), updatePatient)
//   .delete(auditLog("DELETE", "PATIENT"), deletePatient);
export default router;
