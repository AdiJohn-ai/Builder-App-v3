import express from "express";
import bcrypt from "bcryptjs";
import Requester from "../models/Requester.js";
import Freelancer from "../models/Freelancer.js";
import Enterprise from "../models/Enterprise.js";

const router = express.Router();

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, role, confirmPassword } = req.body;

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    let existingUser;
    let newUser;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    switch (role) {
      case "Service Requester":
        existingUser = await Requester.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists with this email or phone" });
        }
        newUser = new Requester({
          name,
          email,
          password: hashedPassword,
          phone,
          role: "service requester"
        });
        break;

      case "Freelancer":
        existingUser = await Freelancer.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists with this email or phone" });
        }
        newUser = new Freelancer({
          name,
          email,
          password: hashedPassword,
          phone,
          role: "freelancer",
          skills: [],
          hourRate: 0,
          certification: []
        });
        break;

      case "Building Enterprise":
        existingUser = await Enterprise.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists with this email or phone" });
        }
        newUser = new Enterprise({
          name,
          email,
          password: hashedPassword,
          phone,
          role: "Building Enterprise",
          serviceType: [],
          location: { city: "Yaounde", state: "Centre", country: "Cameroon" }
        });
        break;

      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in any collection
    let user =
      (await Requester.findOne({ email })) ||
      (await Freelancer.findOne({ email })) ||
      (await Enterprise.findOne({ email }));

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
