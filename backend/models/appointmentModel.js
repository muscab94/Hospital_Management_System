import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff", 
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    reason: { type: String }
  },
  { timestamps: true }
);

const APPOINTMENT_MODEL = mongoose.model("appointment", appointmentSchema);
export default APPOINTMENT_MODEL;
