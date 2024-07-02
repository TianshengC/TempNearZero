const CustomError = require("../../../src/utils/CustomError");

describe("CustomError", () => {
  it("should create an instance with correct properties for client error (4xx)", () => {
    const error = new CustomError(400, "Bad Request");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Bad Request");
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
  });

  it("should create an instance with correct properties for server error (5xx)", () => {
    const error = new CustomError(500, "Internal Server Error");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe("Internal Server Error");
    expect(error.status).toBe("error");
    expect(error.isOperational).toBe(true);
  });

  it('should set status to "fail" for all 4xx status codes', () => {
    const errorCodes = [400, 401, 403, 404, 422];

    errorCodes.forEach((code) => {
      const error = new CustomError(code, `Error ${code}`);
      expect(error.status).toBe("fail");
    });
  });

  it('should set status to "error" for all 5xx status codes', () => {
    const errorCodes = [500, 501, 502, 503, 504];

    errorCodes.forEach((code) => {
      const error = new CustomError(code, `Error ${code}`);
      expect(error.status).toBe("error");
    });
  });

  it("should capture and have a stack trace", () => {
    const error = new CustomError(500, "Test Special Error");

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("Test Special Error");
  });
});
