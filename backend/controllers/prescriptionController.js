import PRESCRIPTION_MODEL from "../models/prescriptionModel.js";

// CREATE prescription
export const createPrescription = async (req, res) => {
  try {
    const prescription = await PRESCRIPTION_MODEL.create(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await PRESCRIPTION_MODEL.find()
      .populate("patient", "name phone")
      .populate("staff", "name role department");
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single prescription
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await PRESCRIPTION_MODEL.findById(req.params.id)
      .populate("patient", "name phone")
      .populate("staff", "name role department");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE prescription
export const updatePrescription = async (req, res) => {
  try {
    const prescription = await PRESCRIPTION_MODEL.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE prescription
export const deletePrescription = async (req, res) => {
  try {
    const prescription = await PRESCRIPTION_MODEL.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
