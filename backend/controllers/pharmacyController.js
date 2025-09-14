import PHARMACY_MODEL from "../models/pharmacyModel.js";

// CREATE medicine
export const createMedicine = async (req, res) => {
  try {
    const medicine = await PHARMACY_MODEL.create(req.body)
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

// GET all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await PHARMACY_MODEL.find()
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

// GET single medicine
export const getSingleMedicine = async (req, res) => {
  try {
    const medicine = await PHARMACY_MODEL.findById(req.params.id)
    if (!medicine) return res.status(404).json({ message: "Medicine not found" })
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

// UPDATE medicine
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await PHARMACY_MODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!medicine) return res.status(404).json({ message: "Medicine not found" })
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

// DELETE medicine
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await PHARMACY_MODEL.findByIdAndDelete(req.params.id)
    if (!medicine) return res.status(404).json({ message: "Medicine not found" })
    res.json({ message: "Medicine deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
