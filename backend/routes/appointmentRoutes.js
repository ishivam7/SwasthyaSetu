// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.route("/")
  .get(protect, getAppointments)
  .post(protect, authorize("patient", "worker"), createAppointment);

router.route("/:id")
  .put(protect, authorize("doctor", "admin", "worker"), updateAppointment);

module.exports = router;