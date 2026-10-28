import * as Sentry from "@sentry/nextjs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RouteError from "./error";

describe("app/error", () => {
  it("shows the friendly error page", () => {
    render(<RouteError error={new Error("boom")} reset={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    expect(screen.getByText(/sentry has logged your issue/i)).toBeInTheDocument();
  });

  it("reports the error to Sentry", () => {
    const error = new Error("boom");
    render(<RouteError error={error} reset={vi.fn()} />);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it("retries when Try again is pressed", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<RouteError error={new Error("boom")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
