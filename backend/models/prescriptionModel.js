import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff", // doctor prescribing
      required: true,
    },
    medicines: [
      {
        name: { type: String, required: true }, 
        dosage: { type: String, required: true }, 
        frequency: { type: String, required: true }, 
        duration: { type: String, required: true }, 
        instructions: { type: String }, 
      },
    ],
    issuedDate: { type: Date, default: Date.now },
    notes: { type: String }
  },
  { timestamps: true }
);

const PRESCRIPTION_MODEL = mongoose.model("prescription", prescriptionSchema);
export default PRESCRIPTION_MODEL;
