const express = require("express");
const cors = require("cors");
const temperatureRoutes = require("./src/routes/temperatureRoutes");
const CustomError = require("./src/utils/CustomError");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/temperature", temperatureRoutes);

// Handle non-existent routes
app.all("*", (req, res, next) => {
  next(new CustomError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

module.exports = app;
