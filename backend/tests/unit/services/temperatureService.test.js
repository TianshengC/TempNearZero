const temperatureService = require("../../../src/services/temperatureService");

describe("Temperature Service", () => {
  describe("findClosestToZero", () => {
    it("should return the closest number to zero", () => {
      const temps = [7, -10, 13, 8, 4, -7.2, -12, 3.1, -3.1, -5];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: 3.1, index: 7 });
    });

    it("should return zero when zero is in the array", () => {
      const temps = [7, -10, 13, 8, 0, -7.2, -12, 3.1, -3.1, -5];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: 0, index: 4 });
    });

    it("should return the positive number when there are two numbers equally close to zero", () => {
      const temps = [5, -5, 10, -10];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: 5, index: 0 });
    });

    it("should return the first number when there are two or more results equally close to zero", () => {
      const temps = [5, 2, -5, 2, 10, -3];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: 2, index: 1 });
    });

    it("should handle an array with a single element", () => {
      const temps = [-3];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: -3, index: 0 });
    });

    it("should handle an array with all positive numbers", () => {
      const temps = [5, 10, 15, 20];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: 5, index: 0 });
    });

    it("should handle an array with all negative numbers", () => {
      const temps = [-5, -10, -15, -20];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: -5, index: 0 });
    });

    it("should return null for an empty array", () => {
      const temps = [];
      const result = temperatureService.findClosestToZero(temps);
      expect(result).toEqual({ value: null, index: -1 });
    });
  });

  describe("createChartData", () => {
    it("should create correct chart data", () => {
      const temperatures = [7, -10, 13];
      const closestIndex = 0;
      const result = temperatureService.createChartData(
        temperatures,
        closestIndex
      );
      expect(result).toEqual([
        { temperature: 7, label: { text: "+7", result: true } },
        { temperature: -10, label: { text: "-10", result: false } },
        { temperature: 13, label: { text: "+13", result: false } },
      ]);
    });

    it("should handle negative numbers correctly", () => {
      const temperatures = [-7, -10, -13];
      const closestIndex = 0;
      const result = temperatureService.createChartData(
        temperatures,
        closestIndex
      );
      expect(result).toEqual([
        { temperature: -7, label: { text: "-7", result: true } },
        { temperature: -10, label: { text: "-10", result: false } },
        { temperature: -13, label: { text: "-13", result: false } },
      ]);
    });

    it("should handle zero correctly", () => {
      const temperatures = [-7, 0, 7];
      const closestIndex = 1;
      const result = temperatureService.createChartData(
        temperatures,
        closestIndex
      );
      expect(result).toEqual([
        { temperature: -7, label: { text: "-7", result: false } },
        { temperature: 0, label: { text: "0", result: true } },
        { temperature: 7, label: { text: "+7", result: false } },
      ]);
    });

    it("should handle an empty array", () => {
      const result = temperatureService.createChartData([], 0);
      expect(result).toEqual([]);
    });
  });
});
