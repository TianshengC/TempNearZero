/**
 * Express error handling middleware.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object (unused in current implementation).
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function (unused in current implementation).
 */

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const env = process.env.NODE_ENV || "development";

  // if develoment environment, send error directly
  // if production environment, send error with limited information
  if (env === "development") {
    sendErrorDev(err, res);
  } else if (env === "production") {
    let error = { ...err }; // copy error object to avoid changing original error object
    error.message = err.message; //explicitly set message property to err.message
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
  // Operational errors are custom errors that are created using CustomError class
  // Operational errors has isOperational property set to true
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: send generic message
  else {
    console.error("Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

module.exports = errorHandler;
