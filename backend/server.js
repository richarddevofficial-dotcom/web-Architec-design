const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { testConnection, initializeTables } = require("./config/database");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(logger);

// Serve uploaded files with cache control
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "30d",
    setHeaders: (res, path) => {
      if (
        path.endsWith(".jpg") ||
        path.endsWith(".png") ||
        path.endsWith(".webp")
      ) {
        res.setHeader("Cache-Control", "public, max-age=2592000");
      }
    },
  }),
);

// API Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contacts", require("./routes/contacts"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    message: "Manuella Architects API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("/api/*", notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  console.log("\n========================================");
  console.log("  🏗️  Manuella Architects API Server");
  console.log("========================================\n");

  const connected = await testConnection();

  if (!connected) {
    console.log("\n⚠️  Database connection failed!");
    console.log("Make sure MySQL is running.\n");
  } else {
    try {
      await initializeTables();
      console.log("✅ Database ready\n");
    } catch (error) {
      console.error("❌ Failed to initialize tables\n");
    }
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`📋 API: http://localhost:${PORT}/api`);
    console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS: ${corsOptions.origin}`);
    console.log("========================================\n");
  });
};

startServer();
