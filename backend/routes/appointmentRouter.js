import express from "express"
import {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js"

import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

// CREATE appointment (Admin, Receptionist, Doctor can create)
router.post("/", authMiddleware, authorizeRoles("admin", "receptionist", "doctor"), createAppointment)

// GET all appointments (Admin, Receptionist, Doctor can view)
router.get("/", authMiddleware, authorizeRoles("admin", "receptionist", "doctor"), getAllAppointments)

// GET single appointment
router.get("/:id", authMiddleware, authorizeRoles("admin", "receptionist", "doctor", "patient"), getSingleAppointment)

// UPDATE appointment (Admin, Doctor, Receptionist can update)
router.put("/:id", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), updateAppointment)

// DELETE appointment (Admin only)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteAppointment)

export default router
