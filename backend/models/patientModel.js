const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String,  required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, lowercase: true },
    address: { type: String },
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

module.exports = mongoose.model("patient", patientSchema);

