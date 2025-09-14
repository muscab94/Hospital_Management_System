const express = require("express");
const patientController = require("../controller/patientController")

const  router = express.Router();


router.post("/create/patient", patientController.createPatient);      // create
router.get("/read/patient", patientController.readPatients);         // read all
router.get("/readSingle/patient/:id", patientController.readSingle);   // read single
router.put("/update/patient/:id", patientController.updatePatient);    // update
router.delete("/delete/patient/:id", patientController.deletePatient); // delete

module.exports = router

