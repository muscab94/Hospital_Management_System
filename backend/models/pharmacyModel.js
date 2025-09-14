import mongoose from "mongoose"

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    brand: { type: String, trim: true },
    category: { type: String, enum: ["Tablet", "Capsule", "Syrup", "Injection", "Other"], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }, 
    expiryDate: { type: Date, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const PHARMACY_MODEL = mongoose.model("pharmacy", pharmacySchema)
export default PHARMACY_MODEL
