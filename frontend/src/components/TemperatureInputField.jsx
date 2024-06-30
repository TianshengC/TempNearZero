import PropTypes from "prop-types";
import Button from "./Button";

const TemperatureInputField = ({
  input,
  onInputChange,
  onAddTemperature,
  error,
}) => (
  <div className="flex mb-2 gap-3 ">
    <input
      type="text"
      value={input}
      onChange={onInputChange}
      onKeyPress={(e) => e.key === "Enter" && onAddTemperature()}
      className="flex-grow px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
      placeholder="Enter temperature..."
    />
    <Button onClick={onAddTemperature}>Add</Button>
    {error && <p className="text-error mb-4">{error}</p>}
  </div>
);

TemperatureInputField.propTypes = {
  input: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAddTemperature: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TemperatureInputField;
