import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import moment from 'moment';

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let query = {};

  if (req.user.role === 'doctor') {
    query.doctor = req.user.id;
  }

  if (req.query.date) {
    const startDate = new Date(req.query.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    query.appointmentDate = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.doctor) {
    query.doctor = req.query.doctor;
  }

  const appointments = await Appointment.find(query)
    .populate('patient', 'fullName phone patientId')
    .populate('doctor', 'name specialty')
    .populate('scheduledBy', 'name')
    .sort({ appointmentDate: 1, appointmentTime: 1 })
    .limit(limit)
    .skip(startIndex);

  const total = await Appointment.countDocuments(query);

  res.status(200).json({
    success: true,
    count: appointments.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: appointments,
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient', 'fullName phone email patientId dateOfBirth gender')
    .populate('doctor', 'name specialty phone email')
    .populate('scheduledBy', 'name email');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  if (req.user.role === 'doctor' && appointment.doctor._id.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this appointment',
    });
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Receptionist, Admin)
export const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, appointmentDate, appointmentTime, reason, type, priority } = req.body;

  const patientExists = await Patient.findById(patient);
  if (!patientExists) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  const doctorExists = await User.findOne({ _id: doctor, role: 'doctor', isActive: true });
  if (!doctorExists) {
    return res.status(404).json({ success: false, message: 'Doctor not found or inactive' });
  }

  const conflictingAppointment = await Appointment.findOne({
    doctor,
    appointmentDate: new Date(appointmentDate),
    appointmentTime,
    status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
  });

  if (conflictingAppointment) {
    return res.status(400).json({ success: false, message: 'Doctor already has an appointment at this time' });
  }

  const appointment = await Appointment.create({
    patient,
    doctor,
    appointmentDate,
    appointmentTime,
    reason,
    type,
    priority,
    scheduledBy: req.user.id,
  });

  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'fullName phone patientId')
    .populate('doctor', 'name specialty')
    .populate('scheduledBy', 'name');

  res.status(201).json({
    success: true,
    message: 'Appointment scheduled successfully',
    data: populatedAppointment,
  });
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = asyncHandler(async (req, res) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
  }

  if (req.body.appointmentDate || req.body.appointmentTime) {
    const appointmentDate = req.body.appointmentDate || appointment.appointmentDate;
    const appointmentTime = req.body.appointmentTime || appointment.appointmentTime;
    const doctor = req.body.doctor || appointment.doctor;

    const conflictingAppointment = await Appointment.findOne({
      _id: { $ne: appointment._id },
      doctor,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
    });

    if (conflictingAppointment) {
      return res.status(400).json({ success: false, message: 'Doctor already has an appointment at this time' });
    }
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('patient', 'fullName phone patientId')
    .populate('doctor', 'name specialty');

  res.status(200).json({ success: true, message: 'Appointment updated successfully', data: appointment });
});

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
  }

  await Appointment.findByIdAndUpdate(req.params.id, {
    status: 'cancelled',
    notes: req.body.reason || 'Cancelled by user',
  });

  res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
});

// @desc    Get doctor's availability
// @route   GET /api/appointments/availability/:doctorId
// @access  Private
export const getDoctorAvailability = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' });
  }

  const appointments = await Appointment.find({
    doctor: doctorId,
    appointmentDate: new Date(date),
    status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
  }).select('appointmentTime duration');

  const timeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  const bookedTimes = appointments.map((app) => app.appointmentTime);
  const availableSlots = timeSlots.filter((slot) => !bookedTimes.includes(slot));

  res.status(200).json({
    success: true,
    data: {
      date,
      availableSlots,
      bookedSlots: bookedTimes,
    },
  });
});

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private
export const getAppointmentStats = asyncHandler(async (req, res) => {
  const today = moment().startOf('day');
  const tomorrow = moment().add(1, 'day').startOf('day');

  let query = {};
  if (req.user.role === 'doctor') {
    query.doctor = req.user.id;
  }

  const todayAppointments = await Appointment.countDocuments({
    ...query,
    appointmentDate: { $gte: today.toDate(), $lt: tomorrow.toDate() },
  });

  const pendingAppointments = await Appointment.countDocuments({
    ...query,
    status: 'scheduled',
  });

  const completedAppointments = await Appointment.countDocuments({
    ...query,
    status: 'completed',
  });

  res.status(200).json({
    success: true,
    data: {
      todayAppointments,
      pendingAppointments,
      completedAppointments,
    },
  });
});
