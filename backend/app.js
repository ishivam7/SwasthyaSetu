// backend/app.js (Updated snippet)
const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "SwasthyaSetu API" });
});

// Mount Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/facilities", require("./routes/facilityRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/records", require("./routes/medicalRecordRoutes"));
app.use("/api/triage", require("./routes/triageRoutes"));
app.use(notFound);
app.use(errorHandler);

module.exports = app;