import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useBearStore } from "../../store/useBearStore";

import App from "../../App";

const mockStore = {
  bears: 0,
};

describe("bears", () => {
  beforeEach(() => {
    render(<App />);
    useBearStore.getState().resetBears();
  });

  test("render heading with bears count", () => {
    const totalHeading = screen.getByRole("heading", { level: 1 });
    expect(totalHeading).toHaveTextContent(mockStore.bears);
  });

  test("render increase button", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /inc bears/i }));

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(mockStore.bears + 1);
  });

  test("render decrease button", async () => {
    useBearStore.setState({ bears: 2 });

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /decrease bears/i }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "1 Bears",
    );
  });

  test("render update button", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /update bears/i }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("2");
  });

  test("render reset button", () => {
    const increaseButton = screen.getByRole("button", {
      name: /reset bears/i,
    });
    expect(increaseButton).toBeInTheDocument();
  });
});
