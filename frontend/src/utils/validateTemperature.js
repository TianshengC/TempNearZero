export const validateTemperature = (temp, temperatures) => {
  if (temp === "") {
    return "Temperature cannot be empty.";
  }

  if (temperatures.length >= 20) {
    return "Maximum of 20 temperatures allowed.";
  }

  if (!/^-?\d+(\.\d)?$/.test(temp)) {
    return "Temperature must be a valid number with at most one decimal place.";
  }

  const num = parseFloat(temp);
  if (num < -100 || num > 70) {
    return "Temperature must be between -100 and 70.";
  }

  return null;
};
