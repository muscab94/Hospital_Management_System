import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String },
    age: { type: Number, required: true },
    sex: { type: String,  required: true, enum: ["Female", "Male"]},
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);
const PATIENT_MODEL =  mongoose.model("patient", patientSchema);
export default PATIENT_MODEL

