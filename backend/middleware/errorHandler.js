const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Maximum size is 5MB.",
    });
  }

  // Multer file type error
  if (err.message === "Only images allowed") {
    return res.status(400).json({
      success: false,
      message: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
    });
  }

  // MySQL duplicate entry
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry. This record already exists.",
    });
  }

  // Default server error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
