const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

// POST /api/admin/login
router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { username, password } = req.body;
      const admin = await Admin.findByUsernameOrEmail(username);

      if (!admin) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await Admin.comparePassword(password, admin.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { adminId: admin.id },
        process.env.JWT_SECRET || "manuella-architects-jwt-secret-2024",
        { expiresIn: "24h" },
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        admin: { id: admin.id, username: admin.username, email: admin.email },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// POST /api/admin/register (for initial setup)
router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const existing = await Admin.findByUsernameOrEmail(req.body.username);
      if (existing) {
        return res
          .status(400)
          .json({ success: false, message: "Admin already exists" });
      }

      const adminId = await Admin.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "Admin created", id: adminId });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// GET /api/admin/profile (protected)
router.get("/profile", auth, async (req, res) => {
  const admin = await Admin.findById(req.adminId);
  res.json({ success: true, data: admin });
});

module.exports = router;
