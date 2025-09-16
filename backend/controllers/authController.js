import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import AuditLog from '../models/AuditLog.js';
import { json } from 'express';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public (Admin only for creating staff)
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, address, employeeId, specialty, licenseNumber } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(JSON.stringify(existingUser, null, 2))
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists',
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    address,
    employeeId,
    specialty,
    licenseNumber,
  });

  const token = user.getSignedJwtToken();

  await AuditLog.create({
    user: req.user ? req.user._id : user._id,
    action: 'CREATE',
    resource: 'USER',
    resourceId: user._id.toString(),
    details: { email, role },
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an email and password',
    });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated. Please contact administrator.',
    });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const token = user.getSignedJwtToken();

  await AuditLog.create({
    user: user._id,
    action: 'LOGIN',
    resource: 'SYSTEM',
    resourceId: user._id.toString(),
    details: { email },
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      specialty: user.specialty,
    },
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'User details updated successfully',
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(400).json({
      success: false,
      message: 'Password is incorrect',
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    token,
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  await AuditLog.create({
    user: req.user._id,
    action: 'LOGOUT',
    resource: 'SYSTEM',
    resourceId: req.user._id.toString(),
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
