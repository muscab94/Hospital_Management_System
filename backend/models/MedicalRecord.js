import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  recordId: {
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
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  chiefComplaint: {
    type: String,
    required: [true, 'Chief complaint is required']
  },
  symptoms: [String],
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required']
  },
  treatment: {
    type: String,
    required: [true, 'Treatment is required']
  },
  vitalSigns: {
    temperature: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
    height: Number,
    weight: Number,
    bmi: Number
  },
  labTests: [{
    testName: String,
    result: String,
    normalRange: String,
    date: { type: Date, default: Date.now }
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  followUpDate: Date,
  notes: String,
  attachments: [String], // URLs to medical documents/images
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique record ID
medicalRecordSchema.pre('save', async function(next) {
  if (!this.recordId) {
    const count = await this.constructor.countDocuments();
    this.recordId = `MED${String(count + 1).padStart(6, '0')}`;
  }
  
  // Calculate BMI if height and weight are provided
  if (this.vitalSigns.height && this.vitalSigns.weight) {
    const heightInMeters = this.vitalSigns.height / 100;
    this.vitalSigns.bmi = (this.vitalSigns.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  
  this.updatedAt = Date.now();
  next();
});

const MEDICAL_RECORD_MODEL = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MEDICAL_RECORD_MODEL