const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ success: false, message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin)
      return res.status(401).json({ success: false, message: "Invalid token" });

    req.admin = admin;
    req.adminId = admin.id;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

module.exports = auth;
