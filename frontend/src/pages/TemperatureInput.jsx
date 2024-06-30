import { useState } from "react";
import PropTypes from "prop-types";
import { validateTemperature } from "../utils/validateTemperature";
import TemperatureInputField from "../components/TemperatureInputField";
import TemperatureList from "../components/TemperatureList";
import Button from "../components/Button";

const TemperatureInput = ({ onTemperaturesChange }) => {
  const [input, setInput] = useState("");
  const [temperatures, setTemperatures] = useState([]);
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
      onTemperaturesChange(newTemperatures);
      setInput("");
    }
  };

  const handleRemoveTemperature = (index) => {
    const newTemperatures = temperatures.filter((_, i) => i !== index);
    setTemperatures(newTemperatures);
    onTemperaturesChange(newTemperatures);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg text-center font-bold mb-4 text-textPrimary">
        Enter temperature values between -100°C and 70°C.
      </h2>
      <div className="text-lg text-textPrimary max-w-2xl mx-auto mt-2 mb-5">
        <p>Input requirements:</p>
        <ul className="list-disc list-inside">
          <li>Temperatures must be between -100°C and 70°C.</li>
          <li>
            Temperature must be a valid number with at most one decimal place.
            (e.g., 23.5).
          </li>
          <li>
            Please use {"'-'"} to represent negative numbers (e.g., -1.4).
          </li>
          <li>Maximum of 20 temperatures allowed.</li>
        </ul>
      </div>
      <TemperatureInputField
        input={input}
        onInputChange={handleInputChange}
        onAddTemperature={handleAddTemperature}
        error={error}
      />

      <hr className="w-full border-t border-gray-200 my-2 shadow-sm" />
      <TemperatureList
        temperatures={temperatures}
        onRemoveTemperature={handleRemoveTemperature}
      />
      <div className="flex items-center justify-center gap-5">
        <Button onClick={() => setTemperatures([])}>Submit</Button>
        <Button onClick={() => setTemperatures([])} variant="remove">
          Remove All
        </Button>
      </div>
    </div>
  );
};

TemperatureInput.propTypes = {
  onTemperaturesChange: PropTypes.func.isRequired,
};

export default TemperatureInput;
