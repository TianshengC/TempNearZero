/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../../src/components/Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies the correct classes for normal variant", () => {
    render(<Button onClick={() => {}}>Normal Button</Button>);
    const button = screen.getByRole("button", { name: "Normal Button" });
    expect(button).toHaveClass("bg-primary", "text-textSecondary");
  });

  it("applies the correct classes for remove variant", () => {
    render(
      <Button onClick={() => {}} variant="remove">
        Remove Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Remove Button" });
    expect(button).toHaveClass("bg-error", "text-textSecondary");
  });

  it("applies disabled styles when disabled", () => {
    render(
      <Button onClick={() => {}} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
    expect(button).toBeDisabled();
  });

  it("applies additional className when provided", () => {
    render(
      <Button onClick={() => {}} className="custom-class">
        Custom Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Custom Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("applies data-test attribute when provided", () => {
    render(
      <Button onClick={() => {}} dataTest="test-button">
        Test Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveAttribute("data-test", "test-button");
  });

  it("applies custom role when provided", () => {
    render(
      <Button onClick={() => {}} dataTestid="link">
        Link Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Link Button" });
    expect(button).toHaveAttribute("data-testid", "link");
  });
});
