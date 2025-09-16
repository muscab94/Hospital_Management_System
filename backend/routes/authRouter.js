import express from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout
} from '../controllers/authController.js';

import { protect, authorize } from '../middleware/auth.js';
import auditLog from '../middleware/auditLog.js';

const router = express.Router();

router.post('/register', auditLog('CREATE', 'USER'), register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, auditLog('UPDATE', 'USER'), updateDetails);
router.put('/updatepassword', protect, auditLog('UPDATE', 'USER'), updatePassword);

export default router;
