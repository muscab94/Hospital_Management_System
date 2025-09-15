import express from "express"
import {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../controllers/medicalRecordController.js"

import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

// CREATE record (doctor or nurse only)
router.post("/", authMiddleware, authorizeRoles("doctor", "nurse"), createMedicalRecord)

// GET all records (admin, doctor, nurse)
router.get("/", authMiddleware, authorizeRoles("admin", "doctor", "nurse"), getAllMedicalRecords)

// GET single record
router.get("/:id", authMiddleware, authorizeRoles("admin", "doctor", "nurse"), getMedicalRecordById)

// UPDATE record (doctor or nurse)
router.put("/:id", authMiddleware, authorizeRoles("doctor", "nurse"), updateMedicalRecord)

// DELETE record (admin only)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteMedicalRecord)

export default router
