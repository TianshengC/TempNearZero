const {
  calculateClosestToZero,
} = require("../../../src/controllers/temperatureController");
const temperatureService = require("../../../src/services/temperatureService");
const CustomError = require("../../../src/utils/CustomError");

// Mock the temperature service
jest.mock("../../../src/services/temperatureService");

describe("Temperature Controller", () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should calculate closest to zero and return chart data", () => {
    const mockTemperatures = [1, -2, 3, -4, 5];
    const mockResult = { value: 1, index: 0 };
    const mockChartData = [
      { temperature: 1, label: { text: "+1", result: true } },
    ];

    mockRequest.body.temperatures = mockTemperatures;

    temperatureService.findClosestToZero.mockReturnValue(mockResult);
    temperatureService.createChartData.mockReturnValue(mockChartData);

    calculateClosestToZero(mockRequest, mockResponse, mockNext);

    expect(temperatureService.findClosestToZero).toHaveBeenCalledWith(
      mockTemperatures
    );
    expect(temperatureService.createChartData).toHaveBeenCalledWith(
      mockTemperatures,
      mockResult.index
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      chartData: mockChartData,
      closestToZero: mockResult.value,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should throw CustomError if temperatures are not provided", () => {
    calculateClosestToZero(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    expect(mockNext.mock.calls[0][0].message).toBe(
      "Invalid input: temperatures was not provided."
    );
  });

  it("should pass any error from temperatureService to next", () => {
    const mockError = new Error("Service error");
    mockRequest.body.temperatures = [1, 2, 3];

    temperatureService.findClosestToZero.mockImplementation(() => {
      throw mockError;
    });

    calculateClosestToZero(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
