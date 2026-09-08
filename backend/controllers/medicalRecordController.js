// controllers/medicalRecordController.js
const MedicalRecord = require("../models/MedicalRecord");

// @desc    Create a new medical record / EHR
// @route   POST /api/records
// @access  Private (Doctor / Health Worker)
const createMedicalRecord = async (req, res, next) => {
  try {
    const { patient, facility, diagnosis, symptoms, vitals, prescriptions, notes } = req.body;

    const record = await MedicalRecord.create({
      patient,
      doctor: req.user._id,
      facility,
      diagnosis,
      symptoms,
      vitals,
      prescriptions,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get medical records for a patient or logged-in user
// @route   GET /api/records
// @access  Private
const getMedicalRecords = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === "patient") {
      query.patient = req.user._id;
    } else if (req.query.patientId) {
      query.patient = req.query.patientId;
    }

    const records = await MedicalRecord.find(query)
      .populate("patient", "name email phone")
      .populate("doctor", "name email specialization")
      .populate("facility", "name type address");

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecords,
};