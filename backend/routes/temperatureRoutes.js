const express = require("express");
const router = express.Router();
const {
  validateTemperatureArrayInput,
} = require("../middlewares/temperatureValidationMiddleware");
const temperatureController = require("../controllers/temperatureController");

router.post(
  "/calculateClosestToZero",
  validateTemperatureArrayInput,
  temperatureController.calculateClosestToZero
);

module.exports = router;
