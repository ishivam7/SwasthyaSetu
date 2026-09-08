// routes/triageRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTriage,
  getTriage,
} = require("../controllers/triageController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.route("/")
  .get(protect, getTriage)
  .post(protect, authorize("worker", "doctor", "admin"), createTriage);

module.exports = router;