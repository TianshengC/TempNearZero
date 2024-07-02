const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const temperatureController = require("../../../src/controllers/temperatureController");
const errorHandler = require("../../../src/middlewares/errorHandler");

const app = express();
app.use(bodyParser.json());
app.post("/calculate-closest", temperatureController.calculateClosestToZero);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
  });
});

describe("Temperature Controller Integration Tests", () => {
  it("should calculate closest to zero and return chart data", async () => {
    const response = await request(app)
      .post("/calculate-closest")
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

  it("should handle case when all temperatures are positive", async () => {
    const response = await request(app)
      .post("/calculate-closest")
      .send({ temperatures: [5, 10, 15, 20] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", 5);
    expect(response.body.chartData[0]).toEqual({
      temperature: 5,
      label: { text: "+5", result: true },
    });
  });

  it("should handle case when all temperatures are negative", async () => {
    const response = await request(app)
      .post("/calculate-closest")
      .send({ temperatures: [-5, -10, -15, -20] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", -5);
    expect(response.body.chartData[0]).toEqual({
      temperature: -5,
      label: { text: "-5", result: true },
    });
  });

  it("should return 400 if temperatures are not provided", async () => {
    const response = await request(app)
      .post("/calculate-closest")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("status", "fail");
    expect(response.body).toHaveProperty(
      "message",
      "Invalid input: temperatures was not provided."
    );
  });

  it("should handle empty temperature array", async () => {
    const response = await request(app)
      .post("/calculate-closest")
      .send({ temperatures: [] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", null);
    expect(response.body).toHaveProperty("chartData", []);
  });

  it("should handle case with duplicate closest values", async () => {
    const response = await request(app)
      .post("/calculate-closest")
      .send({ temperatures: [1, -1, 2, -2] })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("closestToZero", 1);
    expect(response.body.chartData[0]).toEqual({
      temperature: 1,
      label: { text: "+1", result: true },
    });
  });
});
