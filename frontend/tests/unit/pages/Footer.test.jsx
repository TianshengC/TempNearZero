/* eslint-disable no-undef */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/pages/Footer";

describe("Footer", () => {
  it("renders the copyright notice", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent(/© 2024 by Justin Chen/i);
  });
});
