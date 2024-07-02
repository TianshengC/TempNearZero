const errorHandlerIntegrationTest = (err, req, res, next) => {
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandlerIntegrationTest;
