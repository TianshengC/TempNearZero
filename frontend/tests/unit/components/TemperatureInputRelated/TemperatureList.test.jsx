import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemperatureList from "../../../../src/components/TemperatureInputRelated/TemperatureList";

// Mock the TemperatureItem component
vi.mock(
  "../../../../src/components/TemperatureInputRelated/TemperatureItem",
  () => ({
    default: ({ index, temperature, onRemove, disabled, dataTestid }) => (
      <div data-testid={dataTestid}>
        Mocked TemperatureItem {index}: {temperature}°C
        <button onClick={onRemove} disabled={disabled}>
          Remove
        </button>
      </div>
    ),
  })
);

describe("TemperatureList", () => {
  const mockSetTemperatures = vi.fn();

  it("renders the temperature list title", () => {
    render(
      <TemperatureList
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );
    expect(screen.getByTestId("temperature-list-title")).toHaveTextContent(
      "Temperature List"
    );
  });

  it("displays empty list message when no temperatures are added", () => {
    render(
      <TemperatureList
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );
    expect(screen.getByTestId("empty-list-message")).toHaveTextContent(
      "No temperatures added yet."
    );
  });

  it("renders temperature items when temperatures are provided", () => {
    const temperatures = [20, 30, 40];
    render(
      <TemperatureList
        temperatures={temperatures}
        setTemperatures={mockSetTemperatures}
      />
    );

    const itemsContainer = screen.getByTestId("temperature-items-container");
    expect(itemsContainer).toBeInTheDocument();

    temperatures.forEach((temp, index) => {
      const item = screen.getByTestId(`temperature-item-${index}`);
      expect(item).toHaveTextContent(
        `Mocked TemperatureItem ${index}: ${temp}°C`
      );
    });
  });

  it("calls setTemperatures with updated list when a temperature is removed", async () => {
    const temperatures = [20, 30, 40];
    render(
      <TemperatureList
        temperatures={temperatures}
        setTemperatures={mockSetTemperatures}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    await userEvent.click(removeButtons[1]); // Remove the second temperature

    expect(mockSetTemperatures).toHaveBeenCalledWith([20, 40]);
  });

  it("disables remove buttons when disabled prop is true", () => {
    const temperatures = [20, 30];
    render(
      <TemperatureList
        temperatures={temperatures}
        setTemperatures={mockSetTemperatures}
        disabled={true}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    removeButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
