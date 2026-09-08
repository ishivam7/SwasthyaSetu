const User = require("../models/User");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const HealthWorker = require("../models/HealthWorker");
const Patient = require("../models/Patient");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res, next) => {
  try {
    const {
      name, email, phone, password, role, image,
      department, organization, accessLevel,
      specialization, qualification, experience, facility, consultationHours, registration, bio,
      employeeId,
      age, location, emergencyContact,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists with this email");
    }

    const user = await User.create({
      name: name || "SwasthyaSetu User",
      email,
      phone,
      password,
      role: role || "patient",
      image: image || "",
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid user data");
    }

    if (role === "admin") {
      await Admin.create({ userId: user._id, department, organization, accessLevel });
    } else if (role === "doctor") {
      await Doctor.create({ userId: user._id, specialization, qualification, experience, facility, consultationHours, registration, bio });
    } else if (role === "worker") {
      await HealthWorker.create({ userId: user._id, facility, department, employeeId, experience });
    } else {
      await Patient.create({ userId: user._id, age, location, emergencyContact });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        token: generateToken(user._id, user.role),
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image,
          token: generateToken(user._id, user.role),
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let profileDetails = null;

    if (user.role === "admin") {
      profileDetails = await Admin.findOne({ userId: user._id });
    } else if (user.role === "doctor") {
      profileDetails = await Doctor.findOne({ userId: user._id });
    } else if (user.role === "worker") {
      profileDetails = await HealthWorker.findOne({ userId: user._id });
    } else if (user.role === "patient") {
      profileDetails = await Patient.findOne({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      data: { user, profileDetails },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};