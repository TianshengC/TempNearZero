exports.findClosestToZero = (temps) => {
  let closest = temps[0];
  let closestIndex = 0;

  for (let i = 1; i < temps.length; i++) {
    const current = temps[i];
    if (
      Math.abs(current) < Math.abs(closest) ||
      (Math.abs(current) === Math.abs(closest) && current > closest)
    ) {
      closest = current;
      closestIndex = i;
    }
  }

  return { value: closest, index: closestIndex };
};

exports.createChartData = (temperatures, closestIndex) => {
  return temperatures.map((temp, index) => ({
    temperature: temp,
    label: {
      text: temp > 0 ? `+${temp}` : `${temp}`,
      result: index === closestIndex,
    },
  }));
};
