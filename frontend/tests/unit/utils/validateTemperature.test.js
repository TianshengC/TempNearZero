import { describe, it, expect } from "vitest";
import { validateTemperature } from "../../../src/utils/validateTemperature";

describe("validateTemperature", () => {
  it("returns an error message for empty input", () => {
    const result = validateTemperature("", []);
    expect(result).toBe("Temperature cannot be empty.");
  });

  it("returns an error message when maximum temperatures are reached", () => {
    const temperatures = new Array(20).fill(0);
    const result = validateTemperature("10", temperatures);
    expect(result).toBe("Maximum of 20 temperatures allowed.");
  });

  it("returns an error for invalid number format", () => {
    const result = validateTemperature("10.55", []);
    expect(result).toBe(
      "Temperature must be a valid number with at most one decimal place."
    );
  });

  it("returns an error for non-numeric input", () => {
    const result = validateTemperature("abc", []);
    expect(result).toBe(
      "Temperature must be a valid number with at most one decimal place."
    );
  });

  it("returns an error for temperature below -100", () => {
    const result = validateTemperature("-101", []);
    expect(result).toBe("Temperature must be between -100 and 70.");
  });

  it("returns an error for temperature above 70", () => {
    const result = validateTemperature("71", []);
    expect(result).toBe("Temperature must be between -100 and 70.");
  });

  it("returns null for valid temperature (integer)", () => {
    const result = validateTemperature("25", []);
    expect(result).toBeNull();
  });

  it("returns null for valid temperature (decimal)", () => {
    const result = validateTemperature("25.5", []);
    expect(result).toBeNull();
  });

  it("returns null for valid temperature (negative)", () => {
    const result = validateTemperature("-10", []);
    expect(result).toBeNull();
  });

  it("returns null for valid temperature at lower bound", () => {
    const result = validateTemperature("-100", []);
    expect(result).toBeNull();
  });

  it("returns null for valid temperature at upper bound", () => {
    const result = validateTemperature("70", []);
    expect(result).toBeNull();
  });
});
