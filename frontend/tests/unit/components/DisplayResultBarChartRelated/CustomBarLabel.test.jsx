import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CustomBarLabel from "../../../../src/components/DisplayResultBarChartRelated/CustomBarLabel";

describe("CustomBarLabel", () => {
  const defaultProps = {
    x: 50,
    y: 100,
    width: 20,
    value: {
      text: "25",
      result: false,
    },
    resultColor: "red",
    textColor: "black",
  };

  const renderCustomBarLabel = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(
      <svg>
        <CustomBarLabel {...mergedProps} />
      </svg>
    );
  };

  it("renders the text correctly", () => {
    const { getByText } = renderCustomBarLabel();
    expect(getByText("25")).toBeInTheDocument();
  });

  it("positions the text correctly for positive numbers", () => {
    const { container } = renderCustomBarLabel();
    const textElement = container.querySelector("text");
    expect(textElement).toHaveAttribute("x", "60"); // 50 + 20/2
    expect(textElement).toHaveAttribute("y", "95"); // 100 - 5
    expect(textElement).toHaveAttribute("dominant-baseline", "baseline");
  });

  it("positions the text correctly for negative numbers", () => {
    const { container } = renderCustomBarLabel({
      value: { text: "-25", result: false },
    });
    const textElement = container.querySelector("text");
    expect(textElement).toHaveAttribute("x", "60"); // 50 + 20/2
    expect(textElement).toHaveAttribute("y", "105"); // 100 + 5
    expect(textElement).toHaveAttribute("dominant-baseline", "hanging");
  });

  it("uses resultColor when result is true", () => {
    const { container } = renderCustomBarLabel({
      value: { text: "25", result: true },
    });
    const textElement = container.querySelector("text");
    expect(textElement).toHaveAttribute("fill", "red");
  });

  it("uses textColor when result is false", () => {
    const { container } = renderCustomBarLabel({
      value: { text: "25", result: false },
    });
    const textElement = container.querySelector("text");
    expect(textElement).toHaveAttribute("fill", "black");
  });

  it("centers the text horizontally", () => {
    const { container } = renderCustomBarLabel();
    const textElement = container.querySelector("text");
    expect(textElement).toHaveAttribute("text-anchor", "middle");
  });
});
