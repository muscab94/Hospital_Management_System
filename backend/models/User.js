import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// const { JWT_SECRET, JWT_EXPIRE } = require('../config/jwt');
import {JWT_SECRET, JWT_EXPIRE }  from '../config/jwt.js';
import dotenv from 'dotenv'


dotenv.config()

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'receptionist', 'cashier', 'pharmacist'],
    default: 'receptionist'
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  address: {
    type: String,
    required: [true, 'Please provide address']
  },
  employeeId: {
    type: String,
    unique: true,
    required: [true, 'Please provide employee ID']
  },
   specialty: {
    type: String,
    enum: [
      'none',
      'Cardiology',
      'Dermatology',
      'Endocrinology',
      'Gastroenterology',
      'Neurology',
      'Psychiatry',
      'Surgical / Orthopedic',
      'General / Pediatrics',
      'Radiology / Oncology',
      'Urology'
    ],
    required: function() { return this.role === 'doctor'; }
  },
  licenseNumber: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  console.log("Signing token with secret:", JWT_SECRET);
  return jwt.sign({ id: this._id, role: this.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const USER_MODEL = mongoose.model('User', userSchema);
export default USER_MODEL;