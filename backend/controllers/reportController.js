import Appointment from '../models/Appointment.js';
import MedicalRecord from '../models/MedicalRecord.js';
// import Department from "../models/Department.js";
import Patient from '../models/Patient.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import moment from 'moment';

// @desc    Generate dashboard report
// @route   GET /api/reports
// @access  Private (Admin, Receptionist)
export const getReport = asyncHandler(async (req, res) => {
  const today = moment().startOf('day');
  const monthStart = moment().startOf('month');

  // --- Patients by Department ---
  const patientsByDepartment = await Patient.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: "$department", patients: { $sum: 1 } } },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "departmentInfo"
      }
    },
    { $unwind: "$departmentInfo" },
    {
      $project: {
        _id: 0,
        department: "$departmentInfo.name",
        patients: 1,
        color: "$departmentInfo.color"
      }
    }
  ]);

  // --- Patients Summary ---
  const totalPatients = await Patient.countDocuments({ isActive: true });
  const newPatientsToday = await Patient.countDocuments({
    isActive: true,
    createdAt: { $gte: today.toDate() },
  });
  const newPatientsThisMonth = await Patient.countDocuments({
    isActive: true,
    createdAt: { $gte: monthStart.toDate() },
  });

  // --- Appointments Summary ---
  const totalAppointments = await Appointment.countDocuments();
  const todayAppointments = await Appointment.countDocuments({
    appointmentDate: { $gte: today.toDate(), $lt: moment(today).add(1, 'day').toDate() },
  });
  const pendingAppointments = await Appointment.countDocuments({ status: 'scheduled' });
  const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
  const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });

  // --- Medical Records Summary ---
  const totalRecords = await MedicalRecord.countDocuments();
  const recordsToday = await MedicalRecord.countDocuments({ visitDate: { $gte: today.toDate() } });
  const recordsThisMonth = await MedicalRecord.countDocuments({ visitDate: { $gte: monthStart.toDate() } });

  // --- Staff Summary ---
  const totalStaff = await User.countDocuments({ isActive: true });
  const totalDoctors = await User.countDocuments({ role: 'doctor', isActive: true });
  const totalReceptionists = await User.countDocuments({ role: 'receptionist', isActive: true });
  const totalCashiers = await User.countDocuments({ role: 'cashier', isActive: true });
  const totalPharmacists = await User.countDocuments({ role: 'pharmacist', isActive: true });

  res.status(200).json({
    success: true,
    data: {
      patients: { totalPatients, newPatientsToday, newPatientsThisMonth },
      appointments: { totalAppointments, todayAppointments, pendingAppointments, completedAppointments, cancelledAppointments },
      medicalRecords: { totalRecords, recordsToday, recordsThisMonth },
      staff: { totalStaff, totalDoctors, totalReceptionists, totalCashiers, totalPharmacists },
      patientsByDepartment, // <-- include this in the response
    },
  });
});
