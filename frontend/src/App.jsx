import Header from "./pages/Header";
import Footer from "./pages/Footer";
import DisplayResultBarChart from "./pages/DisplayResultBarChart";
import TemperatureInputContainer from "./pages/TemperatureInputContainer";
import NotFound from "./pages/NotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center w-full bg-green-100">
        <Header />
        <main className="grow flex flex-col items-center w-full">
          <Routes>
            <Route path="/" element={<TemperatureInputContainer />} />
            <Route path="/result" element={<DisplayResultBarChart />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
