import STAFF_MODEL from "../models/staffModel.js";

// CREATE staff
export const createStaff = async (req, res) => {
  try {
    const staff = await STAFF_MODEL.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all staff
export const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await STAFF_MODEL.find();
    res.json(staffMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single staff by ID
export const getSingleStaff = async (req, res) => {
  try {
    const staff = await STAFF_MODEL.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await STAFF_MODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await STAFF_MODEL.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
