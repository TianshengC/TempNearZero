import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemperatureInputIntro from "../components/TemperatureInputRelated/TemperatureInputIntro";
import TemperatureInputField from "../components/TemperatureInputRelated/TemperatureInputField";
import TemperatureList from "../components/TemperatureInputRelated/TemperatureList";
import Button from "../components/Button";
import { backendUrl } from "../config/appConfig";
import axios from "axios";

const TemperatureInputContainer = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (temperatures.length === 0) {
      setError("Please enter at least one temperature.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${backendUrl}/temperature/calculateClosestToZero`,
        { temperatures }
      );
      const { chartData, closestToZero } = response.data;

      navigate("/result", {
        state: {
          chartData,
          closestToZero,
        },
      });
    } catch (err) {
      setError(
        "An error occurred while processing your request. Please try again."
      );
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAll = () => {
    setTemperatures([]);
    setError(null);
  };

  return (
    <div
      className="w-full flex flex-col items-center gap-2 p-4 bg-white rounded shadow-md grow"
      data-test="temperature-input-container"
      data-testid="temperature-input-container"
    >
      <TemperatureInputIntro />
      <TemperatureInputField
        temperatures={temperatures}
        setTemperatures={setTemperatures}
        disabled={isLoading}
      />
      <hr className="w-full border-t border-gray-200 my-2 shadow-sm" />
      <TemperatureList
        temperatures={temperatures}
        setTemperatures={setTemperatures}
        disabled={isLoading}
      />
      <div className="flex items-center justify-center gap-5">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || temperatures.length === 0}
          dataTest="submit-temperatures-button"
          dataTestid="submit-temperatures-button"
        >
          {isLoading ? "Processing..." : "Submit"}
        </Button>
        <Button
          onClick={handleRemoveAll}
          variant="remove"
          disabled={isLoading || temperatures.length === 0}
          dataTest="remove-all-temperatures-button"
          dataTestid="remove-all-temperatures-button"
        >
          Remove All
        </Button>
      </div>
      {error && (
        <p
          className="text-error mt-1"
          data-test="submission-error-message"
          data-testid="submission-error-message"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TemperatureInputContainer;
