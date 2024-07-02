import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DisplayResultBarChart from "../../src/pages/DisplayResultBarChart";

// Mock the recharts library
vi.mock("recharts", () => ({
  BarChart: vi.fn(() => null),
  Bar: vi.fn(() => null),
  Cell: vi.fn(() => null),
  XAxis: vi.fn(() => null),
  YAxis: vi.fn(() => null),
  ReferenceLine: vi.fn(() => null),
  ResponsiveContainer: vi.fn(({ children }) => children),
  LabelList: vi.fn(() => null),
}));

// Mock the custom components
vi.mock(
  "../../src/components/DisplayResultBarChartRelated/CustomBarLabel",
  () => ({
    default: () => <div>CustomBarLabel</div>,
  })
);
vi.mock("../components/DisplayResultBarChartRelated/CustomYAxisTick", () => ({
  default: () => <div>CustomYAxisTick</div>,
}));

describe("DisplayResultBarChart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (chartData = [], closestToZero = 0) => {
    return render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/result", state: { chartData, closestToZero } },
        ]}
      >
        <Routes>
          <Route path="/result" element={<DisplayResultBarChart />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("redirects to home page if no data is provided", () => {
    renderWithRouter();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders chart and result when data is provided", () => {
    const chartData = [
      { temperature: 25, label: { text: "+25°C", result: true } },
      { temperature: 40, label: { text: "+40°C", result: false } },
      { temperature: -25, label: { text: "-25°C", result: false } },
    ];
    renderWithRouter(chartData, 25);

    expect(screen.getByTestId("result-chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("result-title")).toHaveTextContent(
      "Temperature Analysis Result"
    );
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("closest-to-zero-result")).toHaveTextContent(
      "Result: 25 is the closest to 0."
    );
  });

  it("navigates back to home when button is clicked", async () => {
    const chartData = [
      { temperature: 25, label: { text: "25°C", result: true } },
    ];
    renderWithRouter(chartData, 25);

    const backButton = screen.getByTestId("back-to-home-button");
    await userEvent.click(backButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
