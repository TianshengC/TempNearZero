const { validateTemperatureArray } = require("../utils/temperatureArraySchema");
const CustomError = require("../utils/CustomError");

exports.validateTemperatureArrayInput = (req, res, next) => {
  const { error } = validateTemperatureArray(req.body);
  if (error) {
    return next(new CustomError(400, error.message));
  }
  next();
};
