import Patient from '../models/Patient.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Receptionist, Doctor, Admin)
export const getPatients = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let query = {};

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query.$or = [
      { fullName: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
      { patientId: searchRegex },
    ];
  }

  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === 'true';
  }

  const patients = await Patient.find(query)
    .populate('registeredBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(startIndex);

  const total = await Patient.countDocuments(query);

  res.status(200).json({
    success: true,
    count: patients.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: patients,
  });
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
export const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
    .populate('registeredBy', 'name email');

  if (!patient) {
    return res.status(404).json({
      success: false,
      message: 'Patient not found',
    });
  }

  res.status(200).json({
    success: true,
    data: patient,
  });
});

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private (Receptionist, Admin)
export const createPatient = asyncHandler(async (req, res) => {
  req.body.registeredBy = req.user.id;

  const patient = await Patient.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Patient created successfully',
    data: patient,
  });
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private (Receptionist, Admin)
export const updatePatient = asyncHandler(async (req, res) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(404).json({
      success: false,
      message: 'Patient not found',
    });
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Patient updated successfully',
    data: patient,
  });
});

// @desc    Delete patient (soft delete)
// @route   DELETE /api/patients/:id
// @access  Private (Admin only)
export const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(404).json({
      success: false,
      message: 'Patient not found',
    });
  }

  await Patient.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    success: true,
    message: 'Patient deactivated successfully',
  });
});

// @desc    Search patients
// @route   GET /api/patients/search/:term
// @access  Private
export const searchPatients = asyncHandler(async (req, res) => {
  const searchTerm = req.params.term;
  const searchRegex = new RegExp(searchTerm, 'i');

  const patients = await Patient.find({
    isActive: true,
    $or: [
      { fullName: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
      { patientId: searchRegex },
    ],
  }).limit(10);

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients,
  });
});

// @desc    Get patient statistics
// @route   GET /api/patients/stats
// @access  Private (Admin, Receptionist)
export const getPatientStats = asyncHandler(async (req, res) => {
  const totalPatients = await Patient.countDocuments({ isActive: true });
  const newPatientsToday = await Patient.countDocuments({
    isActive: true,
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  const newPatientsThisMonth = await Patient.countDocuments({
    isActive: true,
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  res.status(200).json({
    success: true,
    data: {
      totalPatients,
      newPatientsToday,
      newPatientsThisMonth,
    },
  });
});
