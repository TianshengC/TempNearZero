const temperatureService = require("../services/temperatureService");
const CustomError = require("../utils/CustomError");

exports.calculateClosestToZero = (req, res, next) => {
  try {
    const { temperatures } = req.body;

    if (!temperatures) {
      throw new CustomError(
        400,
        "Invalid input: temperatures was not provided."
      );
    }

    const result = temperatureService.findClosestToZero(temperatures);
    const chartData = temperatureService.createChartData(
      temperatures,
      result.index
    );

    res.status(200).json({ chartData, closestToZero: result.value });
  } catch (error) {
    next(error);
  }
};
