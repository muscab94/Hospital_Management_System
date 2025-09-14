import PATIENT_MODEL from '../models/patientModel.js'
// CREATE patient
export const createPatient = async (req, res) => {
  try {
    const patient = await PATIENT_MODEL.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await PATIENT_MODEL.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single patient
export const getSinglePatient = async (req, res) => {
  try {
    const patient = await PATIENT_MODEL.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE patient
export const updatePatient = async (req, res) => {
  try {
    const patient = await PATIENT_MODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete
export const deletePatient = async (req, res) => {
  try {
    const patient = await PATIENT_MODEL.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

