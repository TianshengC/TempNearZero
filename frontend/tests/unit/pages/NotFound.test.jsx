/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../../src/pages/NotFound";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFound", () => {
  it("renders the 404 message, informative message and alert role", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /404 - Page Not Found/i,
    });
    expect(heading).toBeInTheDocument();

    const message = screen.getByText(
      /Sorry, the page you are looking for doesn't exist/i
    );
    expect(message).toBeInTheDocument();

    const alertContainer = screen.getByRole("alert");
    expect(alertContainer).toBeInTheDocument();
  });

  it("has a button and navigates to home page when button is clicked", async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Go back to Home/i });
    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
