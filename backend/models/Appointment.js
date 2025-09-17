import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  duration: {
    type: Number,
    default: 30 // minutes
  },
  type: {
    type: String,
    enum: ['consultation', 'follow-up', 'check-up', 'emergency'],
    default: 'consultation'
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required']
  },
  notes: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique appointment ID
appointmentSchema.pre('save', async function(next) {
  if (!this.appointmentId) {
    const count = await this.constructor.countDocuments();
    this.appointmentId = `APP${String(count + 1).padStart(6, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

const APPOINTMENT_MODEL =  mongoose.model('Appointment', appointmentSchema);
export default APPOINTMENT_MODEL;