// models/Department.js
import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Department name cannot exceed 50 characters']
  },
  description: {
    type: String
  },
  color: { // optional, useful for charts
    type: String,
    default: '#3B82F6'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DEPARTMENT_MODEL = mongoose.model('Department', departmentSchema);
export default DEPARTMENT_MODEL;
