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

export default CustomBarLabel;
