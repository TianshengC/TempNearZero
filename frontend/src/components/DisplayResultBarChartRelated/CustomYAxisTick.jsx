import PropTypes from "prop-types";

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

export default CustomYAxisTick;
