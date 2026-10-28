import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNow } from "./use-now";

function Clock() {
  const now = useNow();
  return <p>{now ? now.toISOString() : "server"}</p>;
}

describe("useNow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-28T12:00:45.000Z"));
  });

  it("is null when rendered on the server", () => {
    expect(renderToString(<Clock />)).toContain("server");
  });

  it("gives the current time to the minute in the browser", () => {
    render(<Clock />);
    expect(screen.getByText("2026-10-28T12:00:00.000Z")).toBeInTheDocument();
  });

  it("moves on when the minute changes", () => {
    render(<Clock />);

    act(() => vi.advanceTimersByTime(15_000));

    expect(screen.getByText("2026-10-28T12:01:00.000Z")).toBeInTheDocument();
  });

  it("stops ticking on unmount", () => {
    const { unmount } = render(<Clock />);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
