const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// POST /api/contacts - Public (submit contact form)
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("subject").trim().notEmpty().withMessage("Subject required"),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const contactId = await Contact.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "Message sent!", id: contactId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// GET /api/contacts - Admin only
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Contact.findAll();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contacts/unread/count - Admin only
router.get("/unread/count", auth, async (req, res) => {
  try {
    const count = await Contact.getUnreadCount();
    res.json({ success: true, unreadCount: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contacts/:id/read - Admin only
router.put("/:id/read", auth, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message)
      return res.status(404).json({ success: false, message: "Not found" });
    const updated = await Contact.markAsRead(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contacts/:id - Admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Contact.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
