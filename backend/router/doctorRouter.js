const express = require("express");
const doctorController = require("../controller/doctorController");

const router = express.Router();

router.post("/create/doctor", doctorController.createDoctor);      // create
router.get("/read/doctor", doctorController.readDoctor);         // read all
router.get("/readSingle/doctor/:id", doctorController.readSingle);   // read single
router.put("/update/doctor/:id", doctorController.updateDoctor);    // update
router.delete("/delete/doctor/:id", doctorController.deleteDoctor); // delete

module.exports = router;
