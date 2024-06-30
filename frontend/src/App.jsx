import Header from "./pages/Header";
import Footer from "./pages/Footer";
import DisplayResultBarChart from "./pages/DisplayResultBar";
import TemperatureInput from "./pages/TemperatureInput";
import { BAR_CHART_CONFIG } from "./config/barChartConfig";
import { useState } from "react";

const data = [
  { temperature: 7, label: { text: "+7", result: false } },
  { temperature: -10, label: { text: "-10", result: false } },
  { temperature: 13, label: { text: "+13", result: false } },
  { temperature: 8, label: { text: "+8", result: false } },
  { temperature: 4, label: { text: "+4", result: true } },
  { temperature: -7.2, label: { text: "-7.2", result: false } },
  { temperature: 4, label: { text: "+4", result: false } },
];

function App() {
  const [temperatures, setTemperatures] = useState([]);
  const handleTemperaturesChange = (newTemperatures) => {
    setTemperatures(newTemperatures);
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-green-100">
      <Header />
      <main className="grow flex flex-col items-center w-full">
        <TemperatureInput onTemperaturesChange={handleTemperaturesChange} />
        <DisplayResultBarChart
          data={data}
          closestToZero={-1.7}
          config={BAR_CHART_CONFIG}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
