const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true }, // takhasus
    phone: { type: Number, required: true, unique: true },
    email: { type: String, lowercase: true },
    address: { type: String },
    availability: { type: String }, // e.g. "Mon-Fri 9am-5pm"
  },
  { timestamps: true }
);

module.exports  = mongoose.model("Doctor", doctorSchema);

