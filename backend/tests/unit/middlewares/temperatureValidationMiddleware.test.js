const {
  validateTemperatureArrayInput,
} = require("../../../src/middlewares/temperatureValidationMiddleware");
const {
  validateTemperatureArray,
} = require("../../../src/utils/temperatureArraySchema");
const CustomError = require("../../../src/utils/CustomError");

// Mock the temperatureArraySchema module
jest.mock("../../../src/utils/temperatureArraySchema", () => ({
  validateTemperatureArray: jest.fn(),
}));

describe("Temperature Validation Middleware", () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = { body: {} };
    mockResponse = {};
    mockNext = jest.fn();
  });

  it("should call next() for valid temperature array", () => {
    validateTemperatureArray.mockReturnValue({ error: null });
    mockRequest.body = { temperatures: [20, 30, -10] };

    validateTemperatureArrayInput(mockRequest, mockResponse, mockNext);

    expect(validateTemperatureArray).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).toHaveBeenCalledWith();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should call next() with CustomError for invalid temperature array", () => {
    const errorMessage = "Invalid temperature array";
    validateTemperatureArray.mockReturnValue({
      error: { message: errorMessage },
    });
    mockRequest.body = { temperatures: [1000, 2000] };

    validateTemperatureArrayInput(mockRequest, mockResponse, mockNext);

    expect(validateTemperatureArray).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
    expect(mockNext.mock.calls[0][0]).toBeInstanceOf(CustomError);
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    expect(mockNext.mock.calls[0][0].message).toBe(errorMessage);
  });

  it("should handle empty request body", () => {
    validateTemperatureArray.mockReturnValue({
      error: { message: "Temperatures are required" },
    });
    mockRequest.body = {};

    validateTemperatureArrayInput(mockRequest, mockResponse, mockNext);

    expect(validateTemperatureArray).toHaveBeenCalledWith({});
    expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
    expect(mockNext.mock.calls[0][0].message).toBe("Temperatures are required");
  });
});
