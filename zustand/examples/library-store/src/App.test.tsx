import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import useLibraryStore from "./store/useLibraryStore";

describe("library app", () => {
  beforeEach(() => {
    localStorage.clear();
    useLibraryStore.setState({
      books: [],
      noOfAvailable: 0,
      noOfIssued: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds and issues a book", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/add book title/i), "The Hobbit");
    await user.type(screen.getByLabelText(/author/i), "J. R. R. Tolkien");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("The Hobbit")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /issue/i }));

    expect(screen.getByText("Available:").closest("p")).toHaveTextContent(
      "Available:0",
    );
    expect(screen.getByText("Issued:").closest("p")).toHaveTextContent(
      "Issued:1",
    );
  });

  it("shows an alert when either title or author is missing", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<App />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Please provide book title and author",
    );

    expect(useLibraryStore.getState().books).toHaveLength(0);
  });
});
