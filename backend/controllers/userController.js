import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all staff members
// @route   GET /api/staff
// @access  Private (Admin only)
export const getAllStaff = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let query = {};

  if (req.query.role) {
    query.role = req.query.role;
  }

  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === 'true';
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { employeeId: searchRegex },
      { phone: searchRegex },
    ];
  }

  const staff = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(startIndex);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: staff.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: staff,
  });
});

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Private (Admin only)
export const getStaffMember = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id).select('-password');

  if (!staff) {
    return res.status(404).json({
      success: false,
      message: 'Staff member not found',
    });
  }

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private (Admin only)
export const updateStaffMember = asyncHandler(async (req, res) => {
  const fieldsToUpdate = { ...req.body };
  delete fieldsToUpdate.password; // Prevent password update here

  let staff = await User.findById(req.params.id);

  if (!staff) {
    return res.status(404).json({
      success: false,
      message: 'Staff member not found',
    });
  }

  staff = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select('-password');

  res.status(200).json({
    success: true,
    message: 'Staff member updated successfully',
    data: staff,
  });
});

// @desc    Deactivate staff member
// @route   DELETE /api/staff/:id
// @access  Private (Admin only)
export const deactivateStaffMember = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id);

  if (!staff) {
    return res.status(404).json({
      success: false,
      message: 'Staff member not found',
    });
  }

  await User.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    success: true,
    message: 'Staff member deactivated successfully',
  });
});

// @desc    Get all doctors
// @route   GET /api/staff/doctors
// @access  Private
export const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: 'doctor', isActive: true })
    .select('name email specialty phone licenseNumber');

  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors,
  });
});

// @desc    Get staff statistics
// @route   GET /api/staff/stats
// @access  Private (Admin only)
export const getStaffStats = asyncHandler(async (req, res) => {
  const totalStaff = await User.countDocuments({ isActive: true });
  const doctors = await User.countDocuments({ role: 'doctor', isActive: true });
  const receptionists = await User.countDocuments({ role: 'receptionist', isActive: true });
  const cashiers = await User.countDocuments({ role: 'cashier', isActive: true });
  const pharmacists = await User.countDocuments({ role: 'pharmacist', isActive: true });

  res.status(200).json({
    success: true,
    data: {
      totalStaff,
      doctors,
      receptionists,
      cashiers,
      pharmacists,
    },
  });
});
