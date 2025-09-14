import express from "express";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

// Admin & Doctor can create, update, delete patients
router.post("/", authMiddleware, authorizeRoles("admin", "doctor"), createPatient);
router.put("/:id", authMiddleware, authorizeRoles("admin", "doctor"), updatePatient);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deletePatient); // Only admin can delete

// All roles can view patients
router.get("/", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), getAllPatients);
router.get("/:id", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), getPatientById);

export default router;


module.exports = router

