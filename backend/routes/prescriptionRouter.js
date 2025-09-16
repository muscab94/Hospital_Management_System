// import express from "express"
// import {
//   createPrescription,
//   getAllPrescriptions,
//   getPrescriptionById,
//   updatePrescription,
//   deletePrescription,
// } from "../controllers/prescriptionController.js"

// import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

// const router = express.Router()

// // CREATE prescription (only doctor/nurse)
// router.post("/", authMiddleware, authorizeRoles("doctor", "nurse"), createPrescription)

// // GET all prescriptions (admin, doctor, nurse)
// router.get("/", authMiddleware, authorizeRoles("admin", "doctor", "nurse"), getAllPrescriptions)

// // GET single prescription
// router.get("/:id", authMiddleware, authorizeRoles("admin", "doctor", "nurse"), getPrescriptionById)

// // UPDATE prescription (doctor/nurse)
// router.put("/:id", authMiddleware, authorizeRoles("doctor", "nurse"), updatePrescription)

// // DELETE prescription (admin only)
// router.delete("/:id", authMiddleware, authorizeRoles("admin"), deletePrescription)

// export default router