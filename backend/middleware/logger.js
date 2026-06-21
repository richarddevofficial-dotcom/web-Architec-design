const logger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const statusColor =
      statusCode >= 400 ? "🔴" : statusCode >= 300 ? "🟡" : "🟢";

    console.log(
      `${statusColor} ${method} ${originalUrl} → ${statusCode} (${duration}ms)`,
    );
  });

  next();
};

module.exports = logger;
