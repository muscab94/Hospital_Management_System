import MedicalRecord from '../models/MedicalRecord.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private (Doctor, Admin)
export const getMedicalRecords = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let query = {};

  if (req.user.role === 'doctor') {
    query.doctor = req.user.id;
  }

  if (req.query.patient) {
    query.patient = req.query.patient;
  }

  const records = await MedicalRecord.find(query)
    .populate('patient', 'firstName lastName patientId dateOfBirth gender')
    .populate('doctor', 'name specialty')
    .populate('appointment', 'appointmentDate appointmentTime')
    .sort({ visitDate: -1 })
    .limit(limit * 1)
    .skip(startIndex);

  const total = await MedicalRecord.countDocuments(query);

  res.status(200).json({
    success: true,
    count: records.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: records,
  });
});

// @desc    Get single medical record
// @route   GET /api/medical-records/:id
// @access  Private
export const getMedicalRecord = asyncHandler(async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id)
    .populate('patient', 'firstName lastName patientId dateOfBirth gender phone email allergies medicalHistory')
    .populate('doctor', 'name specialty phone email')
    .populate('appointment', 'appointmentDate appointmentTime type');

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Medical record not found',
    });
  }

  if (req.user.role === 'doctor' && record.doctor._id.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this record',
    });
  }

  res.status(200).json({
    success: true,
    data: record,
  });
});

// @desc    Create new medical record
// @route   POST /api/medical-records
// @access  Private (Doctor only)
export const createMedicalRecord = asyncHandler(async (req, res) => {
  const {
    patient,
    appointment,
    chiefComplaint,
    symptoms,
    diagnosis,
    treatment,
    vitalSigns,
    labTests,
    medications,
    followUpDate,
    notes,
  } = req.body;

  const patientExists = await Patient.findById(patient);
  if (!patientExists) {
    return res.status(404).json({
      success: false,
      message: 'Patient not found',
    });
  }

  if (appointment) {
    const appointmentExists = await Appointment.findOne({
      _id: appointment,
      doctor: req.user.id,
    });
    if (!appointmentExists) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or not authorized',
      });
    }
  }

  const record = await MedicalRecord.create({
    patient,
    doctor: req.user.id,
    appointment,
    chiefComplaint,
    symptoms,
    diagnosis,
    treatment,
    vitalSigns,
    labTests,
    medications,
    followUpDate,
    notes,
  });

  const populatedRecord = await MedicalRecord.findById(record._id)
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'name specialty');

  res.status(201).json({
    success: true,
    message: 'Medical record created successfully',
    data: populatedRecord,
  });
});

// @desc    Update medical record
// @route   PUT /api/medical-records/:id
// @access  Private (Doctor who created it)
export const updateMedicalRecord = asyncHandler(async (req, res) => {
  let record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Medical record not found',
    });
  }

  if (record.doctor.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this record',
    });
  }

  record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('patient', 'firstName lastName patientId')
    .populate('doctor', 'name specialty');

  res.status(200).json({
    success: true,
    message: 'Medical record updated successfully',
    data: record,
  });
});

// @desc    Get patient's medical history
// @route   GET /api/medical-records/patient/:patientId
// @access  Private
export const getPatientMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const patient = await Patient.findById(patientId);
  if (!patient) {
    return res.status(404).json({
      success: false,
      message: 'Patient not found',
    });
  }

  let query = { patient: patientId };
  if (req.user.role === 'doctor') {
    query.doctor = req.user.id;
  }

  const records = await MedicalRecord.find(query)
    .populate('doctor', 'name specialty')
    .populate('appointment', 'appointmentDate appointmentTime type')
    .sort({ visitDate: -1 })
    .limit(limit * 1)
    .skip(startIndex);

  const total = await MedicalRecord.countDocuments(query);

  res.status(200).json({
    success: true,
    count: records.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: {
      patient: {
        _id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        patientId: patient.patientId,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        allergies: patient.allergies,
        medicalHistory: patient.medicalHistory,
      },
      records,
    },
  });
});

// @desc    Add lab test result
// @route   POST /api/medical-records/:id/lab-tests
// @access  Private (Doctor only)
export const addLabTest = asyncHandler(async (req, res) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Medical record not found',
    });
  }

  if (record.doctor.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this record',
    });
  }

  record.labTests.push(req.body);
  await record.save();

  res.status(200).json({
    success: true,
    message: 'Lab test added successfully',
    data: record,
  });
});

// @desc    Get medical record statistics
// @route   GET /api/medical-records/stats
// @access  Private (Doctor, Admin)
export const getMedicalRecordStats = asyncHandler(async (req, res) => {
  let query = {};
  if (req.user.role === 'doctor') {
    query.doctor = req.user.id;
  }

  const totalRecords = await MedicalRecord.countDocuments(query);

  const recordsToday = await MedicalRecord.countDocuments({
    ...query,
    visitDate: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  const recordsThisMonth = await MedicalRecord.countDocuments({
    ...query,
    visitDate: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  res.status(200).json({
    success: true,
    data: {
      totalRecords,
      recordsToday,
      recordsThisMonth,
    },
  });
});
