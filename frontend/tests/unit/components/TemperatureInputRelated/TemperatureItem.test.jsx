import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemperatureItem from "../../../../src/components/TemperatureInputRelated/TemperatureItem";

describe("TemperatureItem", () => {
  const defaultProps = {
    index: 0,
    temperature: 25.5,
    onRemove: vi.fn(),
    disabled: false,
    dataTest: "temp-item",
    dataTestid: "temp-item",
  };

  it("renders the temperature item correctly", () => {
    render(<TemperatureItem {...defaultProps} />);

    expect(screen.getByTestId("temp-item")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-item-index-0")).toHaveTextContent(
      "1"
    );
    expect(screen.getByTestId("temperature-value-0")).toHaveTextContent(
      "25.5°C"
    );
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", async () => {
    render(<TemperatureItem {...defaultProps} />);

    await userEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(defaultProps.onRemove).toHaveBeenCalledTimes(1);
  });

  it("disables the remove button when disabled prop is true", () => {
    render(<TemperatureItem {...defaultProps} disabled={true} />);

    expect(screen.getByRole("button", { name: /remove/i })).toBeDisabled();
  });

  it("applies correct data-test and data-testid attributes", () => {
    render(<TemperatureItem {...defaultProps} />);

    expect(screen.getByTestId("temp-item")).toHaveAttribute(
      "data-test",
      "temp-item"
    );
    expect(screen.getByTestId("temperature-item-index-0")).toHaveAttribute(
      "data-test",
      "temperature-item-index-0"
    );
    expect(screen.getByTestId("temperature-value-0")).toHaveAttribute(
      "data-test",
      "temperature-value-0"
    );
    expect(screen.getByTestId("remove-temperature-button-0")).toHaveAttribute(
      "data-test",
      "remove-temperature-button-0"
    );
  });
});
