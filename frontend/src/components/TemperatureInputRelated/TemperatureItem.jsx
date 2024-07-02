import PropTypes from "prop-types";
import Button from "../Button";

const TemperatureItem = ({
  index,
  temperature,
  onRemove,
  disabled,
  dataTest,
}) => (
  <div
    className="w-full max-w-[30rem] md:w-1/2 lg:w-1/3 px-10 md:px-5 py-2"
    data-test={dataTest}
  >
    <div className="flex justify-between h-full items-center bg-gray-100 rounded-lg transition duration-300 hover:bg-gray-200 ">
      <div className="grow flex items-center space-x-3 pl-2">
        <span
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-secondary text-textSecondary rounded-full font-bold"
          data-test={`temperature-item-index-${index}`}
        >
          {index + 1}
        </span>
        <span
          className="text-textPrimary text-lg pl-2"
          data-test={`temperature-value-${index}`}
        >
          {temperature.toFixed(1)}°C
        </span>
      </div>
      <Button
        onClick={onRemove}
        variant="remove"
        disabled={disabled}
        dataTest={`remove-temperature-button-${index}`}
      >
        Remove
      </Button>
    </div>
  </div>
);

TemperatureItem.propTypes = {
  index: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dataTest: PropTypes.string,
};

export default TemperatureItem;
