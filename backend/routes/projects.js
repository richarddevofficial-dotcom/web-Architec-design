const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/projects"),
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    ext && mime ? cb(null, true) : cb(new Error("Only images allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// GET /api/projects - Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll(req.query);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/projects/:id - Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/projects - Admin only
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files?.length > 0) {
      data.images = req.files.map((f) => `/uploads/projects/${f.filename}`);
    }
    data.featured = data.featured === "true" || data.featured === true;

    const project = await Project.create(data);
    res.status(201).json({ success: true, message: "Created", data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/projects/:id - Admin only
router.put("/:id", auth, upload.array("images", 5), async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ success: false, message: "Not found" });

    const data = { ...req.body };
    if (req.files?.length > 0) {
      const newImages = req.files.map((f) => `/uploads/projects/${f.filename}`);
      data.images = [...(existing.images || []), ...newImages];
    }
    if (data.featured !== undefined) {
      data.featured = data.featured === "true" || data.featured === true;
    }

    const updated = await Project.update(req.params.id, data);
    res.json({ success: true, message: "Updated", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/projects/:id - Admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Project.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
