import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // Admin should use this for staff
router.post("/login", loginUser);

// Protected Routes
router.get("/", authMiddleware, authorizeRoles("admin"), getAllUsers);
router.get("/:id", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), getUserById);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteUser);

export default router;
