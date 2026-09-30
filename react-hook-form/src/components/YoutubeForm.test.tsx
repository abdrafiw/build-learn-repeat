import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import YoutubeForm from "./YoutubeForm";

describe("YoutubeForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders empty form fields", () => {
    render(<YoutubeForm />);

    expect(screen.getByLabelText(/username/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/channel/i)).toHaveValue("");
    expect(screen.getByLabelText(/age/i)).toHaveValue(null);
  });

  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "log").mockImplementation(() => undefined);

    render(<YoutubeForm />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/channel is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    });
  });
});
