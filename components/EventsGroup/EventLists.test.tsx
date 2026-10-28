import { render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NOW, makeEvent } from "@/test/fixtures/events";
import { LocalDateTime, UpcomingAddToCalendar } from "../ClientComponents/LocalDateTime";
import EventDisplay from "./EventDisplay";
import EventsOverview from "./EventsOverview";
import UpcomingEventsDashboard from "./UpcomingEventsDash";

vi.mock("add-to-calendar-button-react", () => ({
  AddToCalendarButton: () => <div data-testid="add-to-calendar" />,
}));

const DAY = 24 * 60 * 60_000;
const at = (offsetDays: number) => new Date(NOW.getTime() + offsetDays * DAY).toISOString();

const liveEvent = (name: string) => makeEvent({ name, start: at(-1), end: at(1) });
const upcomingEvent = (name: string, inDays: number) =>
  makeEvent({ name, start: at(inDays), end: at(inDays + 1) });
const completedEvent = (name: string, daysAgo: number) =>
  makeEvent({ name, start: at(-daysAgo - 1), end: at(-daysAgo) });

const events = [
  liveEvent("Live One"),
  upcomingEvent("Soon 1", 1),
  upcomingEvent("Soon 2", 2),
  upcomingEvent("Soon 3", 3),
  upcomingEvent("Soon 4", 4),
  upcomingEvent("Soon 5", 5),
  upcomingEvent("Soon 6", 6),
  completedEvent("Done 1", 1),
];

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});

describe("EventDisplay", () => {
  it.each([
    ["live", ["Live One"]],
    ["upcoming", ["Soon 1", "Soon 2", "Soon 3", "Soon 4", "Soon 5", "Soon 6"]],
    ["completed", ["Done 1"]],
  ] as const)("shows only %s events", (status, expected) => {
    render(<EventDisplay events={events} status={status} />);
    for (const name of expected) expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(expected.length);
  });

  it("titles the page by status", () => {
    render(<EventDisplay events={events} status="upcoming" />);
    expect(screen.getByRole("heading", { level: 1, name: "Upcoming Events" })).toBeInTheDocument();
  });

  it("shows an empty state", () => {
    render(<EventDisplay events={[]} status="live" />);
    expect(screen.getByText("No live events found.")).toBeInTheDocument();
  });

  it("renders placeholders, not events, on the server", () => {
    const html = renderToString(<EventDisplay events={events} status="live" />);
    expect(html).not.toContain("Live One");
    expect(html).toContain('data-slot="skeleton"');
  });
});

describe("EventsOverview", () => {
  const section = (name: string) =>
    screen.getByRole("heading", { level: 2, name }).closest("section") as HTMLElement;

  it("shows the first three upcoming events and a link to the rest", () => {
    render(<EventsOverview events={events} />);
    const upcoming = section("Upcoming Events");

    expect(within(upcoming).getByText("Soon 3")).toBeInTheDocument();
    expect(within(upcoming).queryByText("Soon 4")).not.toBeInTheDocument();
    expect(within(upcoming).getByRole("link", { name: "View all 6" })).toHaveAttribute(
      "href",
      "/events/upcoming",
    );
  });

  it("shows every live event without a View all link", () => {
    render(<EventsOverview events={events} />);
    const live = section("Live Events");
    expect(within(live).getByText("Live One")).toBeInTheDocument();
    expect(within(live).queryByRole("link")).not.toBeInTheDocument();
  });

  it("hides View all when a section fits", () => {
    render(<EventsOverview events={events} />);
    expect(within(section("Completed Events")).queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows empty states", () => {
    render(<EventsOverview events={[]} />);
    expect(screen.getByText("No live events at the moment.")).toBeInTheDocument();
    expect(screen.getByText("No upcoming events at the moment.")).toBeInTheDocument();
  });

  it("doesn't nest a button inside the View all link", () => {
    const { container } = render(<EventsOverview events={events} />);
    expect(container.querySelector("a button, button a")).toBeNull();
  });
});

describe("UpcomingEventsDashboard", () => {
  it("shows the next five upcoming events in order", () => {
    render(<UpcomingEventsDashboard events={[...events].reverse()} />);
    const names = screen.getAllByText(/^Soon \d$/).map((el) => el.textContent);
    expect(names).toEqual(["Soon 1", "Soon 2", "Soon 3", "Soon 4", "Soon 5"]);
  });

  it("says when nothing is coming up", () => {
    render(<UpcomingEventsDashboard events={[liveEvent("Live One")]} />);
    expect(screen.getByText("No upcoming events right now")).toBeInTheDocument();
  });
});

describe("LocalDateTime", () => {
  it("formats the date in the viewer's locale", () => {
    render(<LocalDateTime value="2026-11-21T14:00:00.000" />);
    expect(screen.getByText(new Date("2026-11-21T14:00:00.000").toLocaleString())).toHaveAttribute(
      "dateTime",
      "2026-11-21T14:00:00.000",
    );
  });

  it("shows TBA for a missing date", () => {
    render(<LocalDateTime value={null} />);
    expect(screen.getByText("TBA")).toBeInTheDocument();
  });

  it("renders a placeholder on the server", () => {
    expect(renderToString(<LocalDateTime value="2026-11-21T14:00:00.000" />)).toContain(
      'data-slot="skeleton"',
    );
  });
});

describe("UpcomingAddToCalendar", () => {
  it("offers Add to Calendar before the event starts", () => {
    render(<UpcomingAddToCalendar event={upcomingEvent("Soon", 1)} />);
    expect(screen.getByTestId("add-to-calendar")).toBeInTheDocument();
  });

  it("hides it once the event has started", () => {
    render(<UpcomingAddToCalendar event={liveEvent("Now")} />);
    expect(screen.queryByTestId("add-to-calendar")).not.toBeInTheDocument();
  });
});
