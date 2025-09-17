// import express from "express"
// import {
//   createMedicine,
//   getAllMedicines,
//   getSingleMedicine,
//   updateMedicine,
//   deleteMedicine,
// } from "../controllers/pharmacyController.js"

// import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

// const router = express.Router()

// // CREATE medicine (Admin, Pharmacist only)
// router.post("/", authMiddleware, authorizeRoles("admin", "pharmacist"), createMedicine)

// // GET all medicines (Admin, Pharmacist, Doctor, Receptionist can view)
// router.get("/", authMiddleware, authorizeRoles("admin", "pharmacist", "doctor", "receptionist"), getAllMedicines)

// // GET single medicine
// router.get("/:id", authMiddleware, authorizeRoles("admin", "pharmacist", "doctor", "receptionist"), getSingleMedicine)

// // UPDATE medicine (Admin, Pharmacist only)
// router.put("/:id", authMiddleware, authorizeRoles("admin", "pharmacist"), updateMedicine)

// // DELETE medicine (Admin only)
// router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteMedicine)

// export default router
