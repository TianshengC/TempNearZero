import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemperatureInputField from "../../../../src/components/TemperatureInputRelated/TemperatureInputField";
import { validateTemperature } from "../../../../src/utils/validateTemperature";

// Mock the validateTemperature function
vi.mock("../../../../src/utils/validateTemperature", () => ({
  validateTemperature: vi.fn(),
}));

describe("TemperatureInputField", () => {
  const mockSetTemperatures = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders input field and add button", () => {
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    expect(screen.getByRole("textbox", { name: "" })).toBeInTheDocument();
    expect(
      screen.getByTestId("add-temperature-button", { name: /Add/i })
    ).toBeInTheDocument();
  });

  it("updates input value on change", async () => {
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "25");
    expect(input).toHaveValue("25");
  });

  it("calls setTemperatures with new temperature when Add button is clicked", async () => {
    vi.mocked(validateTemperature).mockReturnValue(null);
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "25");
    await userEvent.click(
      screen.getByTestId("add-temperature-button", { name: /Add/i })
    );

    expect(mockSetTemperatures).toHaveBeenCalledWith([25]);
    expect(input).toHaveValue("");
  });

  it("displays error message when input is invalid", async () => {
    vi.mocked(validateTemperature).mockReturnValue("Invalid temperature");
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "invalid");
    await userEvent.click(
      screen.getByTestId("add-temperature-button", { name: /Add/i })
    );

    expect(screen.getByText("Invalid temperature")).toBeInTheDocument();
    expect(mockSetTemperatures).not.toHaveBeenCalled();
  });

  it("adds temperature when Enter key is pressed", async () => {
    vi.mocked(validateTemperature).mockReturnValue(null);
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "25{enter}");

    expect(mockSetTemperatures).toHaveBeenCalledWith([25]);
    expect(input).toHaveValue("");
  });

  it("disables input and button when disabled prop is true", () => {
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
        disabled
      />
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(
      screen.getByTestId("add-temperature-button", { name: /Add/i })
    ).toBeDisabled();
  });

  it("clears error message when input changes", async () => {
    vi.mocked(validateTemperature)
      .mockReturnValueOnce("Invalid temperature")
      .mockReturnValueOnce(null);
    render(
      <TemperatureInputField
        temperatures={[]}
        setTemperatures={mockSetTemperatures}
      />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "invalid");
    await userEvent.click(
      screen.getByTestId("add-temperature-button", { name: /Add/i })
    );

    expect(screen.getByText("Invalid temperature")).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "25");

    expect(screen.queryByText("Invalid temperature")).not.toBeInTheDocument();
  });
});
