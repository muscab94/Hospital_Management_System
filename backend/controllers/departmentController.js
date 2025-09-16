import DEPARTMENT_MODEL from "../models/DepartMent.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
export const getDepartments = asyncHandler(async (req, res) => {
  const departments = await DEPARTMENT_MODEL.find().sort({ name: 1 });
  res.status(200).json({ success: true, data: departments });
});

// @desc    Create new department
// @route   POST /api/departments
// @access  Private (Admin)
export const createDepartment = asyncHandler(async (req, res) => {
  const { name, color } = req.body;
  const existing = await DEPARTMENT_MODEL.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Department already exists");
  }
  const department = await DEPARTMENT_MODEL.create({ name, color });
  res.status(201).json({ success: true, data: department });
});

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin)
export const updateDepartment = asyncHandler(async (req, res) => {
  const { name, color } = req.body;
  const department = await DEPARTMENT_MODEL.findByIdAndUpdate(
    req.params.id,
    { name, color, updatedAt: Date.now() },
    { new: true }
  );
  if (!department) {
    res.status(404);
    throw new Error("Department not found");
  }
  res.status(200).json({ success: true, data: department });
});

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin)
export const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await DEPARTMENT_MODEL.findByIdAndDelete(req.params.id);
  if (!department) {
    res.status(404);
    throw new Error("Department not found");
  }
  res.status(200).json({ success: true, message: "Department deleted" });
});
