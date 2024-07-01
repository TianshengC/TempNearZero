const TemperatureInputIntro = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-base sm:text-lg max-w-2xl w-full sm:w-4/5 text-center font-bold mb-4 text-textPrimary">
        Enter temperature values
      </h2>
      <div className="text-base sm:text-lg text-textPrimary max-w-2xl w-5/6 sm:w-4/5 mt-2 mb-5">
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
    </div>
  );
};
export default TemperatureInputIntro;
