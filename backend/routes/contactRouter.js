import express from "express"
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controllers/conatctController.js"

import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

// PUBLIC route - anyone can send a message
router.post("/", createContact)

// PROTECTED routes (admin only)
router.get("/", authMiddleware, authorizeRoles("admin"), getAllContacts)
router.get("/:id", authMiddleware, authorizeRoles("admin"), getContactById)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteContact)

export default router
