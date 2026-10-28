import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  it("shows a friendly message by default", () => {
    render(<ErrorPage />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows a custom message", () => {
    render(<ErrorPage message="Error getting upcoming events" />);
    expect(screen.getByText(/error getting upcoming events/i)).toBeInTheDocument();
  });

  it("doesn't prefix the message with the component name [bug 1.8]", () => {
    const { container } = render(<ErrorPage message="Error getting upcoming events" />);
    expect(container).toHaveTextContent(/^Error getting upcoming events$/);
  });
});
