import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TemperatureInputContainer from "../../src/pages/TemperatureInputContainer";
import { backendUrl } from "../../src/config/appConfig";

vi.mock("axios");

const renderWithRouter = (initialEntries = [""]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<TemperatureInputContainer />} />
        <Route
          path="/result"
          element={
            <div data-testid="result-chart-container">
              result-chart-container
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("TemperatureInputContainer", () => {
  beforeEach(() => {
    renderWithRouter();
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    expect(
      screen.getByTestId("temperature-input-container")
    ).toBeInTheDocument();
    expect(screen.getByText("Enter temperature values")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-temperature-button")).toBeInTheDocument();
    expect(
      screen.getByTestId("submit-temperatures-button")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("remove-all-temperatures-button")
    ).toBeInTheDocument();
  });

  it("disables submit and remove all buttons when no temperatures", () => {
    expect(screen.getByTestId("submit-temperatures-button")).toBeDisabled();
    expect(screen.getByTestId("remove-all-temperatures-button")).toBeDisabled();
  });

  it("adds a temperature when input is valid", async () => {
    const input = screen.getByTestId("temperature-input");
    const addButton = screen.getByTestId("add-temperature-button");

    await userEvent.type(input, "25");
    await userEvent.click(addButton);

    expect(screen.getByTestId("temperature-value-0")).toHaveTextContent(
      "25.0°C"
    );
  });

  it("shows error message for invalid input", async () => {
    const input = screen.getByTestId("temperature-input");
    const addButton = screen.getByTestId("add-temperature-button");

    await userEvent.type(input, "invalid");
    await userEvent.click(addButton);

    expect(screen.getByTestId("input-error-message")).toBeInTheDocument();
  });

  it("removes all temperatures when remove all button is clicked", async () => {
    const input = screen.getByTestId("temperature-input");
    const addButton = screen.getByTestId("add-temperature-button");
    const removeAllButton = screen.getByTestId(
      "remove-all-temperatures-button"
    );

    await userEvent.type(input, "25");
    await userEvent.click(addButton);
    await userEvent.type(input, "30");
    await userEvent.click(addButton);

    expect(screen.getAllByTestId(/temperature-value-/)).toHaveLength(2);

    await userEvent.click(removeAllButton);

    expect(screen.queryByTestId(/temperature-item-/)).not.toBeInTheDocument();
  });

  it("submits temperatures and navigates to result page on success", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        chartData: [{ temperature: 25, label: { text: "25°C", result: true } }],
        closestToZero: 25,
      },
    });

    const input = screen.getByTestId("temperature-input");
    const addButton = screen.getByTestId("add-temperature-button");
    const submitButton = screen.getByTestId("submit-temperatures-button");

    await userEvent.type(input, "25");
    await userEvent.click(addButton);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${backendUrl}/temperature/calculateClosestToZero`,
        { temperatures: [25] }
      );
      expect(screen.getByTestId("result-chart-container")).toBeInTheDocument();
    });
  });

  it("shows error message on submission failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    const input = screen.getByTestId("temperature-input");
    const addButton = screen.getByTestId("add-temperature-button");
    const submitButton = screen.getByTestId("submit-temperatures-button");

    await userEvent.type(input, "25");
    await userEvent.click(addButton);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId("submission-error-message")
      ).toBeInTheDocument();
    });
  });
});
