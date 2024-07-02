import PropTypes from "prop-types";
import Button from "../Button";
import { validateTemperature } from "../../utils/validateTemperature";
import { useState } from "react";

const TemperatureInputField = ({ temperatures, setTemperatures, disabled }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError("");
  };

  const handleAddTemperature = () => {
    const validationError = validateTemperature(input, temperatures);
    if (validationError) {
      setError(validationError);
    } else {
      const newTemperature = parseFloat(parseFloat(input).toFixed(1));
      const newTemperatures = [...temperatures, newTemperature];
      setTemperatures(newTemperatures);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-2">
      <div className="flex mb-2 gap-4 ">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && handleAddTemperature()}
          className="w-64 px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
          placeholder="Enter temperature..."
          disabled={disabled}
          data-test="temperature-input"
          data-testid="temperature-input"
        />
        <Button
          onClick={handleAddTemperature}
          disabled={disabled}
          dataTest="add-temperature-button"
          dataTestid="add-temperature-button"
        >
          Add
        </Button>
      </div>
      {error && (
        <p
          className="text-error mb-4"
          data-test="input-error-message"
          data-testid="input-error-message"
        >
          {error}
        </p>
      )}
    </div>
  );
};

TemperatureInputField.propTypes = {
  temperatures: PropTypes.arrayOf(PropTypes.number).isRequired,
  setTemperatures: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TemperatureInputField;
