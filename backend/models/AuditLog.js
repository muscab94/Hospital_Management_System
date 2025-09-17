import mongoose from 'mongoose';
const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: [
      'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
      'VIEW', 'SEARCH', 'EXPORT', 'IMPORT', 'BACKUP',
      'PAYMENT_RECEIVED', 'PRESCRIPTION_ISSUED', 'APPOINTMENT_SCHEDULED'
    ]
  },
  resource: {
    type: String,
    required: [true, 'Resource is required'],
    enum: [
      'USER', 'PATIENT', 'APPOINTMENT', 'MEDICAL_RECORD',
      'PRESCRIPTION', 'MEDICINE', 'BILL', 'PAYMENT', 'SYSTEM'
    ]
  },
  resourceId: {
    type: String,
    required: [true, 'Resource ID is required']
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
auditLogSchema.index({ user: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1, timestamp: -1 });

const AUDITLOG_MODEL = mongoose.model('AuditLog', auditLogSchema);
export default AUDITLOG_MODEL;