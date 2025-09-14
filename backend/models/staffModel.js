import mongoose from "mongoose"

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String , required: true },
    age: { type: Number , required: true },
    sex: { type: String, required: true, enum: ["Female", "Male"] },
    role: { 
      type: String, 
      required: true, 
      enum: ["Doctor", "Nurse", "Admin", "Technician", "Pharmacist", "Other"] 
    },
    department: { type: String , required: true },
    shift: { 
      type: String, 
      enum: ["Day", "Night"], 
      default: "Day" 
    }
  },
  { timestamps: true }
)

const STAFF_MODEL = mongoose.model("staff", staffSchema)
export default STAFF_MODEL
