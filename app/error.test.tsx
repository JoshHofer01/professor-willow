import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { describe, expect, it, vi } from "vitest";

type ErrorBoundaryProps = { error: Error & { digest?: string }; reset: () => void };

// app/error.tsx doesn't exist until 1.8. Importing it at runtime keeps this a
// failing test instead of a suite that can't be collected.
async function loadErrorBoundary() {
  const path = "./error";
  const mod = (await import(/* @vite-ignore */ path)) as { default: ComponentType<ErrorBoundaryProps> };
  return mod.default;
}

describe("app/error", () => {
  it("shows the friendly error page inside the layout [bug 1.8]", async () => {
    const ErrorBoundary = await loadErrorBoundary();
    render(<ErrorBoundary error={new Error("boom")} reset={vi.fn()} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("retries when Try again is pressed [bug 1.8]", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const ErrorBoundary = await loadErrorBoundary();
    render(<ErrorBoundary error={new Error("boom")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
