import CONTACT_MODEL from "../models/contactModel.js";

// CREATE new contact message
export const createContact = async (req, res) => {
  try {
    const contact = await CONTACT_MODEL.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all contact messages (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await CONTACT_MODEL.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single contact message by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await CONTACT_MODEL.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE contact message (admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await CONTACT_MODEL.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
