// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NOW, makeEvent } from "@/test/fixtures/events";
import { json, mockFetch } from "@/test/mockFetch";
import { getEvents } from "./getEvents";

const EVENTS_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";

function serve(events: unknown) {
  return mockFetch({ [EVENTS_URL]: json(events) });
}

describe("getEvents", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  it("requests the ScrapedDuck events feed", async () => {
    const stub = serve([]);
    await getEvents();
    expect(stub).toHaveBeenCalledWith(EVENTS_URL, expect.anything());
  });

  it("classifies events as live, upcoming or completed", async () => {
    const live = makeEvent({ start: "2026-10-27T10:00:00.000", end: "2026-10-29T10:00:00.000" });
    const upcoming = makeEvent({ start: "2026-11-01T10:00:00.000", end: "2026-11-02T10:00:00.000" });
    const completed = makeEvent({ start: "2026-10-01T10:00:00.000", end: "2026-10-02T10:00:00.000" });
    serve([live, upcoming, completed]);

    const result = await getEvents();

    expect(result.liveEvents.map((e) => e.eventID)).toEqual([live.eventID]);
    expect(result.upcomingEvents.map((e) => e.eventID)).toEqual([upcoming.eventID]);
    expect(result.completedEvents.map((e) => e.eventID)).toEqual([completed.eventID]);
  });

  it("sets the status field on each classified event", async () => {
    serve([
      makeEvent(),
      makeEvent({ start: "2026-11-01T10:00:00.000", end: "2026-11-02T10:00:00.000" }),
      makeEvent({ start: "2026-10-01T10:00:00.000", end: "2026-10-02T10:00:00.000" }),
    ]);

    const { liveEvents, upcomingEvents, completedEvents } = await getEvents();

    expect(liveEvents[0].status).toBe("live");
    expect(upcomingEvents[0].status).toBe("upcoming");
    expect(completedEvents[0].status).toBe("completed");
  });

  it("treats an event as live at exactly its start and its end", async () => {
    const startsNow = makeEvent({ start: NOW.toISOString(), end: "2026-10-30T00:00:00.000Z" });
    const endsNow = makeEvent({ start: "2026-10-27T00:00:00.000Z", end: NOW.toISOString() });
    serve([startsNow, endsNow]);

    const { liveEvents } = await getEvents();

    expect(liveEvents.map((e) => e.eventID).sort()).toEqual(
      [startsNow.eventID, endsNow.eventID].sort(),
    );
  });

  it("sorts live by soonest end, upcoming by soonest start, completed by most recent end", async () => {
    const liveLate = makeEvent({ end: "2026-11-05T00:00:00.000" });
    const liveSoon = makeEvent({ end: "2026-10-29T00:00:00.000" });
    const upLate = makeEvent({ start: "2026-12-01T00:00:00.000", end: "2026-12-02T00:00:00.000" });
    const upSoon = makeEvent({ start: "2026-11-01T00:00:00.000", end: "2026-11-02T00:00:00.000" });
    const doneOld = makeEvent({ start: "2026-09-01T00:00:00.000", end: "2026-09-02T00:00:00.000" });
    const doneRecent = makeEvent({ start: "2026-10-20T00:00:00.000", end: "2026-10-21T00:00:00.000" });
    serve([liveLate, liveSoon, upLate, upSoon, doneOld, doneRecent]);

    const result = await getEvents();

    expect(result.liveEvents.map((e) => e.eventID)).toEqual([liveSoon.eventID, liveLate.eventID]);
    expect(result.upcomingEvents.map((e) => e.eventID)).toEqual([upSoon.eventID, upLate.eventID]);
    expect(result.completedEvents.map((e) => e.eventID)).toEqual([
      doneRecent.eventID,
      doneOld.eventID,
    ]);
  });

  it("keeps only the first word of the event type", async () => {
    serve([makeEvent({ eventType: "community-day extra words" })]);
    const { liveEvents } = await getEvents();
    expect(liveEvents[0].eventType).toBe("community-day");
  });

  it("returns the full event list as eventsData", async () => {
    const events = [makeEvent(), makeEvent()];
    serve(events);
    const { eventsData } = await getEvents();
    expect(eventsData.map((e) => e.eventID)).toEqual(events.map((e) => e.eventID));
  });

  it("skips events with unparsable dates", async () => {
    serve([makeEvent({ start: "not a date" }), makeEvent({ end: "soon" })]);
    const { liveEvents, upcomingEvents, completedEvents } = await getEvents();
    expect([...liveEvents, ...upcomingEvents, ...completedEvents]).toHaveLength(0);
  });

  it("skips events with null dates instead of treating them as 1970 [bug 1.2]", async () => {
    serve([makeEvent({ start: null, end: null }), makeEvent({ start: null })]);
    const { liveEvents, upcomingEvents, completedEvents } = await getEvents();
    expect([...liveEvents, ...upcomingEvents, ...completedEvents]).toHaveLength(0);
  });

  describe("when the feed is unavailable", () => {
    const empty = {
      liveEvents: [],
      upcomingEvents: [],
      completedEvents: [],
      eventsData: [],
    };

    it("resolves to empty lists on a non-OK response and reports it once", async () => {
      mockFetch({ [EVENTS_URL]: new Response("Server error", { status: 500 }) });
      await expect(getEvents()).resolves.toEqual(empty);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    });

    it("resolves to empty lists when the body isn't JSON", async () => {
      mockFetch({ [EVENTS_URL]: new Response("<html>oops</html>") });
      await expect(getEvents()).resolves.toEqual(empty);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    });

    it("resolves to empty lists on a network failure", async () => {
      mockFetch({ [EVENTS_URL]: new TypeError("fetch failed") });
      await expect(getEvents()).resolves.toEqual(empty);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    });
  });
});
