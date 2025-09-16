import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controllers/conatctController.js";

import { protect, authorize } from "../middleware/auth.js";
import auditLog from "../middleware/auditLog.js";

const router = express.Router();

// Public route - anyone can send a contact message
router.post("/", auditLog("CREATE", "CONTACT"), createContact);

// All routes below require authentication
router.use(protect);

router
  .route("/")
  .get(authorize("admin"), auditLog("VIEW", "CONTACT"), getAllContacts);

router
  .route("/:id")
  .get(authorize("admin"), auditLog("VIEW", "CONTACT"), getContactById)
  .delete(authorize("admin"), auditLog("DELETE", "CONTACT"), deleteContact);

export default router;
