const express = require("express");
const router = express.Router();
const {
  getFacilities,
  getRecommendedFacilities,
  createFacility,
} = require("../controllers/facilityController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/recommend", getRecommendedFacilities);

router.route("/")
  .get(getFacilities)
  .post(protect, authorize("admin"), createFacility);

module.exports = router;