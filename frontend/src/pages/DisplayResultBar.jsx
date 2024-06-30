import { useMemo } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import PropTypes from "prop-types";

const CustomBarLabel = ({ x, y, width, value, resultColor, textColor }) => {
  const { text, result } = value;
  const isNegative = text[0] === "-";

  return (
    <text
      x={x + width / 2}
      y={isNegative ? y + 5 : y - 5}
      fill={result ? resultColor : textColor}
      textAnchor="middle"
      dominantBaseline={isNegative ? "hanging" : "baseline"}
    >
      {text}
    </text>
  );
};

const CustomYAxisTick = ({
  x,
  y,
  payload,
  minTemp,
  maxTemp,
  hotColor,
  coldColor,
  textColor,
}) => {
  if (payload.value === maxTemp) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={18} y={-16} textAnchor="end" fill={hotColor}>
          Hot
        </text>
        <polygon points="-2,0 8,-15 18,0" fill={hotColor} />
      </g>
    );
  }
  if (payload.value === minTemp) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={22} y={31} textAnchor="end" fill={coldColor}>
          Cold
        </text>
        <polygon points="-2,0 8,15 18,0" fill={coldColor} />
      </g>
    );
  }
  if (payload.value === 0) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-10} y={5} textAnchor="middle" fill={textColor}>
          0
        </text>
      </g>
    );
  }
  return null;
};

const DisplayResultBarChart = ({ data, closestToZero, config }) => {
  const { minTemp, maxTemp } = useMemo(() => {
    const temperatures = data.map((d) => d.temperature);
    return {
      minTemp: Math.min(...temperatures),
      maxTemp: Math.max(...temperatures),
    };
  }, [data]);

  return (
    <div className="flex flex-col items-center bg-white">
      <div
        className={`${config.dimensions.width} ${config.dimensions.height} bg-slate-300`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 5, left: 2, bottom: 5 }}
            barCategoryGap="0%"
          >
            <XAxis
              axisLine={false}
              tickLine={false}
              tick={false}
              padding={{ right: 50 }}
            />
            <YAxis
              tick={(props) => (
                <CustomYAxisTick
                  {...props}
                  minTemp={minTemp}
                  maxTemp={maxTemp}
                  hotColor={config.colors.HOT}
                  coldColor={config.colors.COLD}
                  textColor={config.colors.TEXT}
                />
              )}
              ticks={[minTemp, 0, maxTemp]}
              domain={[minTemp, maxTemp]}
              tickLine={false}
              stroke={config.colors.STROKE}
            />
            <ReferenceLine y={0} stroke={config.colors.STROKE} />
            <Bar dataKey="temperature">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={config.colors.STROKE}
                  strokeWidth="1"
                  fill={
                    entry.temperature > 0
                      ? config.colors.HOT
                      : config.colors.COLD
                  }
                />
              ))}
              <LabelList
                dataKey="label"
                content={(props) => (
                  <CustomBarLabel
                    {...props}
                    resultColor={config.colors.RESULT}
                    textColor={config.colors.TEXT}
                  />
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-base sm:text-lg md:text-2xl px-2">
          Result: {closestToZero} is the closest to 0.
        </p>
      </div>
    </div>
  );
};

DisplayResultBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      label: PropTypes.shape({
        text: PropTypes.string.isRequired,
        result: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ).isRequired,
  closestToZero: PropTypes.number.isRequired,
  config: PropTypes.shape({
    colors: PropTypes.shape({
      HOT: PropTypes.string.isRequired,
      COLD: PropTypes.string.isRequired,
      RESULT: PropTypes.string.isRequired,
      TEXT: PropTypes.string.isRequired,
      STROKE: PropTypes.string.isRequired,
    }).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

CustomBarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  value: PropTypes.shape({
    text: PropTypes.string.isRequired,
    result: PropTypes.bool.isRequired,
  }).isRequired,
  resultColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

CustomYAxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  hotColor: PropTypes.string.isRequired,
  coldColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default DisplayResultBarChart;
