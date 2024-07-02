const Joi = require("joi");

//validate temperature item
const temperatureSchema = Joi.number()
  .min(-100)
  .max(70)
  .custom((value, helpers) => {
    if (!/^-?\d+(\.\d)?$/.test(value.toString())) {
      return helpers.error("number.format");
    }
    return value;
  }, "validate temperature format");

//validate temperature array
const temperatureArraySchema = Joi.object({
  temperatures: Joi.array().items(temperatureSchema).min(1).max(20).required(),
});

const validateTemperatureArray = (data) => {
  return temperatureArraySchema.validate(data, {
    convert: false, // Prevent Joi from converting values
    errors: {
      wrap: {
        label: "",
      },
    },
    messages: {
      "number.base": "Temperature must be a valid number.",
      "number.min": "Temperature must be at least -100°C.",
      "number.max": "Temperature must not exceed 70°C.",
      "number.format":
        "Temperature must be a valid number with at most one decimal place.",
      "array.base": "Temperatures must be an array.",
      "array.min": "At least one temperature is required.",
      "array.max": "Maximum of 20 temperatures allowed.",
      "any.required": "Array of temperatures is required.",
    },
  });
};

module.exports = {
  validateTemperatureArray,
};
