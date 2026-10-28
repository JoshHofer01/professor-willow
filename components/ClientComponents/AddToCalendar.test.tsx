import { render } from "@testing-library/react";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { describe, expect, it, vi } from "vitest";
import { makeEvent } from "@/test/fixtures/events";
import AddToCalendar from "./AddToCalendar";

vi.mock("add-to-calendar-button-react", () => ({
  AddToCalendarButton: vi.fn(() => null),
}));

function propsFor(start: string, end: string) {
  render(<AddToCalendar eventDetails={makeEvent({ name: "Community Day", start, end })} />);
  return vi.mocked(AddToCalendarButton).mock.lastCall![0];
}

describe("AddToCalendar", () => {
  it("passes the event name and dates", () => {
    const props = propsFor("2026-11-21T14:00:00.000", "2026-11-21T17:00:00.000");
    expect(props).toMatchObject({
      name: "Community Day",
      startDate: "2026-11-21T14:00:00.000",
      endDate: "2026-11-21T17:00:00.000",
      location: "Pokemon GO",
    });
  });

  it("uses the viewer's time zone for local-time events", () => {
    const props = propsFor("2026-11-21T14:00:00.000", "2026-11-21T17:00:00.000");
    expect(props.timeZone).toBe("currentBrowser");
  });

  it("treats UTC (Z) events as UTC [bug 1.16]", () => {
    const props = propsFor("2026-11-01T20:00:00.000Z", "2026-11-15T20:00:00.000Z");
    expect(props.timeZone).toBe("UTC");
  });
});
