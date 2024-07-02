/* eslint-disable no-undef */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../../../src/pages/Header";

describe("Header", () => {
  it("renders a heading with the application name", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { name: /TempNearZero/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays a description of the application", () => {
    render(<Header />);
    const description = screen.getByText(/TempNearZero is a web application/i);
    expect(description).toBeInTheDocument();
  });
});
