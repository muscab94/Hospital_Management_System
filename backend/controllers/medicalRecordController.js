import MEDICAL_RECORD_MODEL from "../models/medicalRecordModel"

// CREATE medical record
export const createMedicalRecord = async (req, res) => {
  try {
    const record = await MEDICAL_RECORD_MODEL.create(req.body)
    res.status(201).json(record)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// GET all records
export const getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MEDICAL_RECORD_MODEL.find()
      .populate("patient", "name phone age sex")
      .populate("staff", "name role department")
    res.json(records)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET single record
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MEDICAL_RECORD_MODEL.findById(req.params.id)
      .populate("patient", "name phone age sex")
      .populate("staff", "name role department")

    if (!record) return res.status(404).json({ message: "Record not found" })

    res.json(record)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// UPDATE record
export const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MEDICAL_RECORD_MODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!record) return res.status(404).json({ message: "Record not found" })

    res.json(record)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE record
export const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MEDICAL_RECORD_MODEL.findByIdAndDelete(req.params.id)

    if (!record) return res.status(404).json({ message: "Record not found" })

    res.json({ message: "Medical record deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
