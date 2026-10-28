import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NOW, makeEvent } from "@/test/fixtures/events";
import { CurrentEventsCarousel } from "../ClientComponents/EventCarousel";
import { EventPageCard, OverviewPageCard } from "../CustomCards/EventCards";
import Countdown from "./Countdown";
import EventPopout from "./EventPopout";
import EventTypeBadge from "./EventTypeBadge";

vi.mock("add-to-calendar-button-react", () => ({
  AddToCalendarButton: () => <div data-testid="add-to-calendar" />,
}));

const live = () =>
  makeEvent({
    name: "Halloween Part II",
    status: "live",
    start: "2026-10-27T10:00:00.000",
    end: "2026-10-29T20:00:00.000",
  });
const upcoming = () =>
  makeEvent({
    name: "Pawniard Community Day",
    eventType: "community-day",
    heading: "Community Day",
    status: "upcoming",
    start: "2026-11-21T14:00:00.000",
    end: "2026-11-21T17:00:00.000",
  });
const completed = () =>
  makeEvent({
    name: "Old Event",
    status: "completed",
    start: "2026-10-01T10:00:00.000",
    end: "2026-10-02T10:00:00.000",
  });

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});

describe("CurrentEventsCarousel", () => {
  it("shows an empty state when nothing is live", () => {
    render(<CurrentEventsCarousel eventData={[]} />);
    expect(screen.getByText("No live events right now.")).toBeInTheDocument();
  });

  it("shows a slide per live event with its position", () => {
    render(<CurrentEventsCarousel eventData={[live(), upcoming()]} />);
    expect(screen.getByRole("img", { name: "Halloween Part II" })).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getByText("2/2")).toBeInTheDocument();
  });
});

describe("EventTypeBadge", () => {
  it("shows the heading in the colour for the event type", () => {
    render(<EventTypeBadge eventType="community-day" eventHeading="Community Day" />);
    expect(screen.getByText("Community Day")).toHaveClass("bg-yellow-300");
  });

  it("falls back to the event type when there is no heading", () => {
    render(<EventTypeBadge eventType="raid-hour" />);
    expect(screen.getByText("raid-hour")).toHaveClass("bg-red-400");
  });

  it("uses grey for unknown event types", () => {
    render(<EventTypeBadge eventType="brand-new-type" eventHeading="New" />);
    expect(screen.getByText("New")).toHaveClass("bg-gray-400");
  });
});

describe("Countdown", () => {
  it("counts down to the end of a live event", () => {
    render(<Countdown event={live()} />);
    expect(screen.getByText("Ends in:")).toBeInTheDocument();
  });

  it("counts down to the start of an upcoming event", () => {
    render(<Countdown event={upcoming()} />);
    expect(screen.getByText("Starts in:")).toBeInTheDocument();
  });

  it("says a completed event has ended", () => {
    render(<Countdown event={completed()} />);
    expect(screen.getByText("Ended")).toBeInTheDocument();
  });
});

describe.each([
  ["EventPageCard", EventPageCard],
  ["OverviewPageCard", OverviewPageCard],
])("%s", (_, Card) => {
  it("shows the event name and image", () => {
    const event = live();
    render(<Card event={event} />);
    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: event.name })).toBeInTheDocument();
  });

  it("shows when an upcoming event starts", () => {
    render(<Card event={upcoming()} />);
    expect(screen.getByText("Starts:")).toBeInTheDocument();
    expect(screen.getByText("Nov 21, 2:00 PM")).toBeInTheDocument();
  });

  it("shows when a live event ends", () => {
    render(<Card event={live()} />);
    expect(screen.getByText("Ends:")).toBeInTheDocument();
    expect(screen.getByText("Oct 29, 8:00 PM")).toBeInTheDocument();
  });

  it("shows no start or end label for a completed event", () => {
    render(<Card event={completed()} />);
    expect(screen.queryByText("Starts:")).not.toBeInTheDocument();
    expect(screen.queryByText("Ends:")).not.toBeInTheDocument();
  });

  it("skips the image when the event has none", () => {
    render(<Card event={makeEvent({ image: "", status: "live" })} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

describe("EventPopout", () => {
  async function openWithButton(event = upcoming()) {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <EventPopout gameEvent={event}>
        <button type="button">Open</button>
      </EventPopout>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    return screen.getByRole("dialog", { name: event.name });
  }

  it("opens a dialog named after the event", async () => {
    const dialog = await openWithButton();
    expect(within(dialog).getByRole("heading", { name: "Pawniard Community Day" })).toBeInTheDocument();
  });

  it("shows the event dates and LeekDuck link", async () => {
    const event = upcoming();
    const dialog = await openWithButton(event);
    expect(dialog).toHaveTextContent("Nov 21, 2:00 PM");
    expect(dialog).toHaveTextContent("Nov 21, 5:00 PM");
    expect(within(dialog).getByRole("link", { name: event.link })).toHaveAttribute("href", event.link);
  });

  it("offers Add to Calendar only for upcoming events", async () => {
    const dialog = await openWithButton(upcoming());
    expect(within(dialog).getByTestId("add-to-calendar")).toBeInTheDocument();
  });

  it("doesn't offer Add to Calendar for live events", async () => {
    const dialog = await openWithButton(live());
    expect(within(dialog).queryByTestId("add-to-calendar")).not.toBeInTheDocument();
  });

  it("doesn't present the countdown as a button [bug 2.4]", async () => {
    const dialog = await openWithButton(live());
    expect(within(dialog).queryByRole("button", { name: /ends in/i })).not.toBeInTheDocument();
  });

  it("links to the event's detail page [bug 3.17]", async () => {
    const event = upcoming();
    const dialog = await openWithButton(event);
    expect(within(dialog).getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      `/events/${event.eventID}`,
    );
  });

  it("opens from a card with the keyboard [bug 2.8]", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const event = upcoming();
    render(
      <EventPopout gameEvent={event}>
        <OverviewPageCard event={event} />
      </EventPopout>,
    );

    const trigger = screen.getByRole("button", { name: new RegExp(event.name) });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog", { name: event.name })).toBeInTheDocument();
  });
});
