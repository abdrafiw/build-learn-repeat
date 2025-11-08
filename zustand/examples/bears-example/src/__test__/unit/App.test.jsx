import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../../App";

describe("bears", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("render heading with bears count", () => {
    const totalHeading = screen.getByRole("heading", { level: 1 });
    expect(totalHeading).toHaveTextContent("0 Bears");
  });

  test("render increase button", () => {
    const increaseButton = screen.getByRole("button", { name: /inc bears/i });
    expect(increaseButton).toBeInTheDocument();
  });

  test("render decrease button", () => {
    const increaseButton = screen.getByRole("button", {
      name: /decrease bears/i,
    });
    expect(increaseButton).toBeInTheDocument();
  });

  test("render update button", () => {
    const increaseButton = screen.getByRole("button", {
      name: /update bears/i,
    });
    expect(increaseButton).toBeInTheDocument();
  });

  test("render reset button", () => {
    const increaseButton = screen.getByRole("button", {
      name: /reset bears/i,
    });
    expect(increaseButton).toBeInTheDocument();
  });
});
