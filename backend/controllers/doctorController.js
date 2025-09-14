import DOCTOR_MODEL from '../models/doctorModel.js'

// CREATE doctor
export const createDoctor = async (req, res) => {
  try {
    const doctor = await DOCTOR_MODEL.create(req.body);
    // await doctor.save()
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DOCTOR_MODEL.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single doctor
export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await DOCTOR_MODEL.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await DOCTOR_MODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await DOCTOR_MODEL.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

