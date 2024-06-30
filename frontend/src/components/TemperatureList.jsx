import PropTypes from "prop-types";
import TemperatureItem from "./TemperatureItem";

const TemperatureList = ({ temperatures, onRemoveTemperature }) => (
  <div className="w-full flex flex-col items-center justify-center mt-3">
    <h3 className="text-lg font-bold mb-6 text-textPrimary">
      Temperature List
    </h3>
    {temperatures.length === 0 ? (
      <p className="text-gray-500 italic">No temperatures added yet.</p>
    ) : (
      <div className="flex flex-wrap -mx-2 w-full sm:w-4/5 md:w-4/5 lg:w-4/5 px-5">
        {temperatures.map((temp, index) => (
          <TemperatureItem
            key={index}
            index={index}
            temperature={temp}
            onRemove={() => onRemoveTemperature(index)}
          />
        ))}
      </div>
    )}
  </div>
);

TemperatureList.propTypes = {
  temperatures: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRemoveTemperature: PropTypes.func.isRequired,
};

export default TemperatureList;
