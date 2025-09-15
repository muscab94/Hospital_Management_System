import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // match model name
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // match model name
      required: true,
    },
    diagnosis: { type: String, required: true },
    treatment: { type: String },
    prescription: [
      {
        medicine: { type: String },
        dosage: { type: String },
        frequency: { type: String },
        duration: { type: String },
      },
    ],
    allergies: [String],
    labResults: { type: String },
    visitDate: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

const MEDICAL_RECORD_MODEL = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MEDICAL_RECORD_MODEL;
