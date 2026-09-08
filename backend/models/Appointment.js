// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, "Please add an appointment date"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    symptoms: {
      type: String,
      required: [true, "Please describe symptoms"],
    },
    diagnosis: {
      type: String,
      default: "",
    },
    prescription: [
      {
        medicineName: String,
        dosage: String,
        duration: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);