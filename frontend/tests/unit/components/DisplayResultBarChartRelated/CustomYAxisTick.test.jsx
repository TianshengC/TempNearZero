import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CustomYAxisTick from "../../../../src/components/DisplayResultBarChartRelated/CustomYAxisTick";

describe("CustomYAxisTick", () => {
  const defaultProps = {
    x: 0,
    y: 0,
    payload: { value: 0 },
    minTemp: -10,
    maxTemp: 30,
    hotColor: "red",
    coldColor: "blue",
    textColor: "black",
  };

  const renderCustomYAxisTick = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(
      <svg>
        <CustomYAxisTick {...mergedProps} />
      </svg>
    );
  };

  it('renders "Hot" text and triangle for maximum temperature', () => {
    const { container } = renderCustomYAxisTick({
      payload: { value: 30 },
    });

    const gElement = container.querySelector("g");
    expect(gElement).toHaveAttribute("transform", "translate(0,0)");

    const textElement = container.querySelector("text");
    expect(textElement).toHaveTextContent("Hot");
    expect(textElement).toHaveAttribute("fill", "red");

    const polygonElement = container.querySelector("polygon");
    expect(polygonElement).toHaveAttribute("fill", "red");
  });

  it('renders "Cold" text and triangle for minimum temperature', () => {
    const { container } = renderCustomYAxisTick({
      payload: { value: -10 },
    });

    const gElement = container.querySelector("g");
    expect(gElement).toHaveAttribute("transform", "translate(0,0)");

    const textElement = container.querySelector("text");
    expect(textElement).toHaveTextContent("Cold");
    expect(textElement).toHaveAttribute("fill", "blue");

    const polygonElement = container.querySelector("polygon");
    expect(polygonElement).toHaveAttribute("fill", "blue");
  });

  it('renders "0" for zero temperature', () => {
    const { container } = renderCustomYAxisTick({
      payload: { value: 0 },
    });

    const gElement = container.querySelector("g");
    expect(gElement).toHaveAttribute("transform", "translate(0,0)");

    const textElement = container.querySelector("text");
    expect(textElement).toHaveTextContent("0");
    expect(textElement).toHaveAttribute("fill", "black");
  });

  it("uses provided x and y for translation", () => {
    const { container } = renderCustomYAxisTick({
      x: 10,
      y: 20,
      payload: { value: 30 },
    });

    const gElement = container.querySelector("g");
    expect(gElement).toHaveAttribute("transform", "translate(10,20)");
  });
});
