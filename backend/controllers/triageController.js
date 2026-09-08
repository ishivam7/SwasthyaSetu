// controllers/triageController.js
const triageService = require("../services/triageService");

const createTriage = async (req, res, next) => {
  try {
    const triage = await triageService.createTriageAssessment(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: "Triage assessment completed successfully",
      data: triage,
    });
  } catch (error) {
    next(error);
  }
};

const getTriage = async (req, res, next) => {
  try {
    const assessments = await triageService.getTriageAssessments(req.user);
    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTriage,
  getTriage,
};