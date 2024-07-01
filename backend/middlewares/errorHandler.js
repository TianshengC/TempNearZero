const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const env = process.env.NODE_ENV || "development";

  if (env === "development") {
    sendErrorDev(err, res);
  } else if (env === "production") {
    let error = { ...err };
    error.message = err.message;
    sendErrorProd(error, res);
  }
};

// Error handling for development environment
const sendErrorDev = (err, res) => {
  console.error("Error:", err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Error handling for production environment
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak details
  else {
    console.error("Error:", err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = errorHandler;
