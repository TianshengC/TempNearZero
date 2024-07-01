import { useMemo } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { barChartConfig } from "../config/barChartConfig";
import CustomBarLabel from "../components/DisplayResultBarChartRelated/CustomBarLabel";
import CustomYAxisTick from "../components/DisplayResultBarChartRelated/CustomYAxisTick";
import Button from "../components/Button";

const DisplayResultBarChart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { chartData, closestToZero } = location.state || {
    chartData: [],
    closestToZero: null,
  };

  const { minTemp, maxTemp } = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { minTemp: 0, maxTemp: 0 };
    }

    const temperatures = chartData.map((d) => d.temperature);
    let minTemp = Math.min(...temperatures);
    let maxTemp = Math.max(...temperatures);

    if (minTemp > 0) {
      minTemp = 0;
    }

    if (maxTemp < 0) {
      maxTemp = 0;
    }

    const padding = (maxTemp - minTemp) * 0.1;
    minTemp = minTemp - padding;
    maxTemp = maxTemp + padding;

    return {
      minTemp: minTemp,
      maxTemp: maxTemp,
    };
  }, [chartData]);

  if (!chartData || chartData.length === 0 || closestToZero === null) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center bg-white mb-5">
      <h2 className="text-lg sm:text-2xl lg:text-3xl text-textPrimary font-bold mb-4">
        Temperature Analysis Result
      </h2>
      <div
        className={`${barChartConfig.dimensions.width} ${barChartConfig.dimensions.height}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 5, left: 2, bottom: 5 }}
            barCategoryGap="0%"
          >
            <XAxis
              axisLine={false}
              tickLine={false}
              tick={false}
              padding={{ right: 50 }}
            />
            <YAxis
              tick={(props) => (
                <CustomYAxisTick
                  {...props}
                  minTemp={minTemp}
                  maxTemp={maxTemp}
                  hotColor={barChartConfig.colors.HOT}
                  coldColor={barChartConfig.colors.COLD}
                  textColor={barChartConfig.colors.TEXT}
                />
              )}
              ticks={[minTemp, 0, maxTemp]}
              domain={[minTemp, maxTemp]}
              tickLine={false}
              stroke={barChartConfig.colors.STROKE}
            />
            <ReferenceLine y={0} stroke={barChartConfig.colors.STROKE} />
            <Bar dataKey="temperature">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={barChartConfig.colors.STROKE}
                  strokeWidth="1"
                  fill={
                    entry.temperature > 0
                      ? barChartConfig.colors.HOT
                      : barChartConfig.colors.COLD
                  }
                />
              ))}
              <LabelList
                dataKey="label"
                content={(props) => (
                  <CustomBarLabel
                    {...props}
                    resultColor={barChartConfig.colors.RESULT}
                    textColor={barChartConfig.colors.TEXT}
                  />
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-base sm:text-lg md:text-2xl px-2">
          Result: <span className="font-bold">{closestToZero}</span> is the
          closest to 0.
        </p>
      </div>
      <Button
        onClick={() => navigate("/", { replace: true })}
        className="mt-6 mb-5"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default DisplayResultBarChart;
