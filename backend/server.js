const express = require("express");
const cors = require("cors");
const temperatureRoutes = require("./routes/temperatureRoutes");
const dotenv = require("dotenv");
const CustomError = require("./utils/CustomError");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/temperature", temperatureRoutes);

// Handle non-existent routes
app.all("*", (req, res, next) => {
  next(new CustomError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
