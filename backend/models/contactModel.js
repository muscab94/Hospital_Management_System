import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const CONTACT_MODEL = mongoose.model("Contact", contactSchema)
export default CONTACT_MODEL
