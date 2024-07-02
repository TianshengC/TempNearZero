import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TemperatureInputIntro from "../../../../src/components/TemperatureInputRelated/TemperatureInputIntro";

describe("TemperatureInputIntro", () => {
  it("renders the title correctly", () => {
    render(<TemperatureInputIntro />);
    const title = screen.getByRole("heading", {
      name: /Enter temperature values/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("displays correct number of requirement items", () => {
    render(<TemperatureInputIntro />);
    const requirementItems = screen.getAllByRole("listitem");
    expect(requirementItems).toHaveLength(4);
  });

  it("contains information about temperature range", () => {
    render(<TemperatureInputIntro />);
    expect(
      screen.getByText(/Temperatures must be between -100°C and 70°C/i)
    ).toBeInTheDocument();
  });

  it("contains information about decimal places", () => {
    render(<TemperatureInputIntro />);
    expect(screen.getByText(/at most one decimal place/i)).toBeInTheDocument();
  });

  it("contains information about negative numbers", () => {
    render(<TemperatureInputIntro />);
    expect(
      screen.getByText(/use '-' to represent negative numbers/i)
    ).toBeInTheDocument();
  });

  it("contains information about maximum number of temperatures", () => {
    render(<TemperatureInputIntro />);
    expect(
      screen.getByText(/Maximum of 20 temperatures allowed/i)
    ).toBeInTheDocument();
  });
});
