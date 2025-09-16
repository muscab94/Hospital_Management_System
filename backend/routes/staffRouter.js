// import express from "express"
// import {
//   createStaff,
//   getAllStaff,
//   getSingleStaff,
//   updateStaff,
//   deleteStaff,
// } from "../controllers/staffController.js"

// import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

// const router = express.Router()

// // 👉 Create staff (Admin only)
// router.post("/", authMiddleware, authorizeRoles("admin"), createStaff)

// // 👉 Get all staff (Admin only)
// router.get("/", authMiddleware, authorizeRoles("admin"), getAllStaff)

// // 👉 Get single staff (Admin, Doctor, Receptionist can view)
// router.get("/:id", authMiddleware, authorizeRoles("admin", "doctor", "receptionist"), getSingleStaff)

// // 👉 Update staff (Admin only)
// router.put("/:id", authMiddleware, authorizeRoles("admin"), updateStaff)

// // 👉 Delete staff (Admin only)
// router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteStaff)

// export default router
