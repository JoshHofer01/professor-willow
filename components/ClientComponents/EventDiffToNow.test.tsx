import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NOW } from "@/test/fixtures/events";
import { EventDiffToNow } from "./EventDiffToNow";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const at = (offsetMs: number) => new Date(NOW.getTime() + offsetMs).toISOString();

describe("EventDiffToNow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  it("shows days and hours when a day or more away", () => {
    const { container } = render(<EventDiffToNow eventEnd={at(2 * DAY + 3 * HOUR + 15 * MINUTE)} />);
    expect(container).toHaveTextContent("2D3H");
  });

  it("shows hours and minutes when less than a day away", () => {
    const { container } = render(<EventDiffToNow eventEnd={at(5 * HOUR + 30 * MINUTE)} />);
    expect(container).toHaveTextContent("5H30M");
  });

  it("counts down every minute", () => {
    const { container } = render(<EventDiffToNow eventEnd={at(2 * MINUTE)} />);
    expect(container).toHaveTextContent("0H2M");

    act(() => vi.advanceTimersByTime(MINUTE));

    expect(container).toHaveTextContent("0H1M");
  });

  it("stops its timer on unmount", () => {
    const { unmount } = render(<EventDiffToNow eventEnd={at(HOUR)} />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("applies a custom class name", () => {
    const { container } = render(<EventDiffToNow eventEnd={at(HOUR)} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("never shows negative values once the time has passed", () => {
    const { container } = render(<EventDiffToNow eventEnd={at(-(DAY + 2 * HOUR))} />);
    expect(container.textContent).not.toContain("-");
    expect(container).toHaveTextContent("0H0M");
  });
});
