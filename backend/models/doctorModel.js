import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String },
    email: { type: String, lowercase: true, unique: true},
    sexy: {type: String, enum: ["Female", "Male"]},
    specialty: { type: String, required: true }, // takhasus
    availability: { type: String }, // e.g. "Mon-Fri 9am-5pm"
    salary: {type: Number}
  },
  { timestamps: true }
);

const DOCTOR_MODEL = mongoose.model("Doctor", doctorSchema);
export default DOCTOR_MODEL;
