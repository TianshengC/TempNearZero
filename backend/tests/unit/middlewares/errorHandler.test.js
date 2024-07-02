const errorHandler = require("../../../src/middlewares/errorHandler");

describe("Error Handler", () => {
  let mockRequest;
  let mockResponse;
  let mockNext;
  let mockError;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockError = new Error("Test error");
    console.error = jest.fn(); // Mock console.error
  });

  describe("Development Environment", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should send detailed error in development", () => {
      mockError.statusCode = 400;
      mockError.status = "fail";

      errorHandler(mockError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "fail",
        error: mockError,
        message: "Test error",
        stack: expect.any(String),
      });
      expect(console.error).toHaveBeenCalledWith("Error:", mockError);
    });

    it("should set default status code and status in development", () => {
      errorHandler(mockError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
        })
      );
    });
  });

  describe("Production Environment", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    });

    it("should send operational error message in production", () => {
      // Create a mock operational error (CustomError)
      mockError.statusCode = 400;
      mockError.status = "fail";
      mockError.isOperational = true;
      mockError.message = "Operational error";

      errorHandler(mockError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "fail",
        message: "Operational error",
      });
    });

    it("should send generic error message for non-operational errors in production", () => {
      mockError.isOperational = false;

      errorHandler(mockError, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Something went wrong! Please try again later.",
      });
      expect(console.error).toHaveBeenCalledWith("Error:", expect.any(Object));
    });
  });
});
