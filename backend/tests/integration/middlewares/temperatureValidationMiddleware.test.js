const request = require("supertest");
const express = require("express");
const {
  validateTemperatureArrayInput,
} = require("../../../src/middlewares/temperatureValidationMiddleware");

const app = express();
app.use(express.json());

// Mock route for testing
app.post("/test-validation", validateTemperatureArrayInput, (req, res) => {
  res.status(200).json({ message: "Validation passed" });
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
  });
});

describe("Temperature Validation Middleware Integration Tests", () => {
  it("should pass validation for valid temperature array", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: [20, -15.5, 0, 70, -100] })
      .expect(200);

    expect(response.body.message).toBe("Validation passed");
  });

  it("should return 400 for temperatures below -100°C", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: [-101] })
      .expect(400);

    expect(response.body.message).toBe("Temperature must be at least -100°C.");
  });

  it("should return 400 for temperatures above 70°C", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: [71] })
      .expect(400);

    expect(response.body.message).toBe("Temperature must not exceed 70°C.");
  });

  it("should return 400 for non-numeric temperatures", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: ["not a number"] })
      .expect(400);

    expect(response.body.message).toBe("Temperature must be a valid number.");
  });

  it("should return 400 for temperatures with more than one decimal place", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: [20.55] })
      .expect(400);

    expect(response.body.message).toBe(
      "Temperature must be a valid number with at most one decimal place."
    );
  });

  it("should return 400 for an empty temperature array", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: [] })
      .expect(400);

    expect(response.body.message).toBe("At least one temperature is required.");
  });

  it("should return 400 for more than 20 temperatures", async () => {
    const temperatures = Array(21).fill(0);
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures })
      .expect(400);

    expect(response.body.message).toBe("Maximum of 20 temperatures allowed.");
  });

  it("should return 400 when temperatures array is missing", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Array of temperatures is required.");
  });

  it("should return 400 when temperatures is not an array", async () => {
    const response = await request(app)
      .post("/test-validation")
      .send({ temperatures: "not an array" })
      .expect(400);

    expect(response.body.message).toBe("Temperatures must be an array.");
  });
});
