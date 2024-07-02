const {
  validateTemperatureArray,
} = require("../../../src/utils/temperatureArraySchema");

describe("Temperature Array Schema Validation", () => {
  describe("Valid cases", () => {
    it("should validate an array of valid temperatures", () => {
      const data = { temperatures: [20, -15.5, 0, 70, -100] };
      const { error } = validateTemperatureArray(data);
      expect(error).toBeUndefined();
    });

    it("should validate an array with a single temperature", () => {
      const data = { temperatures: [1] };
      const { error } = validateTemperatureArray(data);
      expect(error).toBeUndefined();
    });

    it("should validate an array with 20 temperatures", () => {
      const data = { temperatures: Array(20).fill(0) };
      const { error } = validateTemperatureArray(data);
      expect(error).toBeUndefined();
    });
  });

  describe("Invalid cases", () => {
    it("should reject temperatures below -100°C", () => {
      const data = { temperatures: [-101] };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Temperature must be at least -100°C.");
    });

    it("should reject temperatures above 70°C", () => {
      const data = { temperatures: [71] };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Temperature must not exceed 70°C.");
    });

    it("should reject temperatures with more than one decimal place", () => {
      const data = { temperatures: [20.55] };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe(
        "Temperature must be a valid number with at most one decimal place."
      );
    });

    it("should reject non-numeric temperatures", () => {
      const data = { temperatures: ["not a number"] };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Temperature must be a valid number.");
    });

    it("should reject an empty array", () => {
      const data = { temperatures: [] };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("At least one temperature is required.");
    });

    it("should reject an array with more than 20 temperatures", () => {
      const data = { temperatures: Array(21).fill(0) };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Maximum of 20 temperatures allowed.");
    });

    it("should reject when temperatures array is missing", () => {
      const data = {};
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Array of temperatures is required.");
    });

    it("should reject when temperatures is not an array", () => {
      const data = { temperatures: "not an array" };
      const { error } = validateTemperatureArray(data);
      expect(error.message).toBe("Temperatures must be an array.");
    });
  });

  describe("Boundary cases", () => {
    it("should accept -100°C", () => {
      const data = { temperatures: [-100] };
      const { error } = validateTemperatureArray(data);
      expect(error).toBeUndefined();
    });

    it("should accept 70°C", () => {
      const data = { temperatures: [70] };
      const { error } = validateTemperatureArray(data);
      expect(error).toBeUndefined();
    });
  });
});
