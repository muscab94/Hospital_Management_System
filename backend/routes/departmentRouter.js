import express from 'express';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getDepartments) // any authenticated user
  .post(protect, authorize('admin'), createDepartment); // only admin

router
  .route('/:id')
  .put(protect, authorize('admin'), updateDepartment)
  .delete(protect, authorize('admin'), deleteDepartment);

export default router;
