const request = require("supertest");
const express = require("express");
const temperatureRoutes = require("../../../src/routes/temperatureRoutes");
const errorHandlerHelper = require("../errorHandlerHelper");

const app = express();
app.use(express.json());
app.use("/temperature", temperatureRoutes);
app.use(errorHandlerHelper);

describe("Temperature Routes Integration Tests", () => {
  it("should calculate closest to zero and return chart data for valid input", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [1, -2, 3, 0, -1] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", 0);
    expect(response.body).toHaveProperty("chartData");
    expect(response.body.chartData).toHaveLength(5);
    expect(response.body.chartData[3]).toEqual({
      temperature: 0,
      label: { text: "0", result: true },
    });
  });

  it("should return 400 if temperatures are not provided", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Array of temperatures is required."
    );
  });

  it("should return 400 for invalid temperature (below -100°C)", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [-101] })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Temperature must be at least -100°C."
    );
  });

  it("should return 400 for invalid temperature (above 70°C)", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [71] })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Temperature must not exceed 70°C."
    );
  });

  it("should return 400 for non-numeric temperature", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: ["not a number"] })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Temperature must be a valid number."
    );
  });

  it("should return 400 for temperature with more than one decimal place", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [20.55] })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Temperature must be a valid number with at most one decimal place."
    );
  });

  it("should return 400 for empty temperature array", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [] })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "At least one temperature is required."
    );
  });

  it("should return 400 for more than 20 temperatures", async () => {
    const temperatures = Array(21).fill(0);
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Maximum of 20 temperatures allowed."
    );
  });

  it("should handle case with all positive temperatures", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [5, 10, 15, 20] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", 5);
    expect(response.body.chartData[0]).toEqual({
      temperature: 5,
      label: { text: "+5", result: true },
    });
  });

  it("should handle case with all negative temperatures", async () => {
    const response = await request(app)
      .post("/temperature/calculateClosestToZero")
      .send({ temperatures: [-5, -10, -15, -20] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", -5);
    expect(response.body.chartData[0]).toEqual({
      temperature: -5,
      label: { text: "-5", result: true },
    });
  });
});
