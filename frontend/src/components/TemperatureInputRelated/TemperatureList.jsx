import PropTypes from "prop-types";
import TemperatureItem from "./TemperatureItem";

const TemperatureList = ({ temperatures, setTemperatures, disabled }) => {
  const handleRemoveTemperature = (index) => {
    const newTemperatures = temperatures.filter((_, i) => i !== index);
    setTemperatures(newTemperatures);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center mt-3"
      data-test="temperature-list-container"
      data-testid="temperature-list-container"
    >
      <h3
        className="text-lg font-bold mb-2 text-textPrimary"
        data-test="temperature-list-title"
        data-testid="temperature-list-title"
      >
        Temperature List
      </h3>
      {temperatures.length === 0 ? (
        <p
          className="text-gray-500 italic mb-2"
          data-test="empty-list-message"
          data-testid="empty-list-message"
        >
          No temperatures added yet.
        </p>
      ) : (
        <div
          className="flex flex-wrap -mx-2 max-w-6xl w-full sm:w-4/5 md:w-4/5 lg:w-4/5 px-5"
          data-test="temperature-items-container"
          data-testid="temperature-items-container"
        >
          {temperatures.map((temp, index) => (
            <TemperatureItem
              key={index}
              index={index}
              temperature={temp}
              onRemove={() => handleRemoveTemperature(index)}
              disabled={disabled}
              dataTest={`temperature-item-${index}`}
              dataTestid={`temperature-item-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

TemperatureList.propTypes = {
  temperatures: PropTypes.arrayOf(PropTypes.number).isRequired,
  setTemperatures: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TemperatureList;
