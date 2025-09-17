import express from 'express';
import {
  getAllStaff,
  getStaffMember,
  updateStaffMember,
  deactivateStaffMember,
  getDoctors,
  getStaffStats
} from '../controllers/userController.js';

import { protect, authorize } from '../middleware/auth.js';
import auditLog from '../middleware/auditLog.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// router.get('/test', (req, res) => {
//   res.json({ user: req.user });
// });

router
  .route('/')
  .get(authorize('admin'), getAllStaff);

router.get('/doctors', authorize('admin', 'receptionist'), getDoctors);
router.get('/stats', authorize('admin'), getStaffStats);

router
  .route('/:id')
  .get(authorize('admin'), auditLog('VIEW', 'USER'), getStaffMember)
  .put(authorize('admin'), auditLog('UPDATE', 'USER'), updateStaffMember)
  .delete(authorize('admin'), auditLog('DELETE', 'USER'), deactivateStaffMember);


// router.route("/").get(getAllStaff);

// router.get("/doctors", getDoctors);
// router.get("/stats", getStaffStats);

// router
//   .route("/:id")
//   .get(auditLog("VIEW", "USER"), getStaffMember)
//   .put(auditLog("UPDATE", "USER"), updateStaffMember)
//   .delete(auditLog("DELETE", "USER"), deactivateStaffMember);

export default router;
