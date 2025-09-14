import APPOINTMENT_MODEL from "../models/appointmentModel.js"

// CREATE appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT_MODEL.create(req.body)
    res.status(201).json(appointment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// GET all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await APPOINTMENT_MODEL.find()
      .populate("patient", "name phone")
      .populate("staff", "name role department")
    res.json(appointments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET single appointment
export const getSingleAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT_MODEL.findById(req.params.id)
      .populate("patient", "name phone")
      .populate("staff", "name role department")
    if (!appointment) return res.status(404).json({ message: "Appointment not found" })
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// UPDATE appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT_MODEL.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!appointment) return res.status(404).json({ message: "Appointment not found" })
    res.json(appointment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT_MODEL.findByIdAndDelete(req.params.id)
    if (!appointment) return res.status(404).json({ message: "Appointment not found" })
    res.json({ message: "Appointment deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
