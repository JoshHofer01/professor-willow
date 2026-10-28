// @vitest-environment node
import { afterEach, describe, expect, it } from "vitest";
import { NOW, makeEvent } from "@/test/fixtures/events";
import { classifyEvents } from "./classifyEvents";

const ids = (events: { eventID: string }[]) => events.map((e) => e.eventID);

describe("classifyEvents", () => {
  it("classifies events as live, upcoming or completed", () => {
    const live = makeEvent({ start: "2026-10-27T10:00:00.000", end: "2026-10-29T10:00:00.000" });
    const upcoming = makeEvent({ start: "2026-11-01T10:00:00.000", end: "2026-11-02T10:00:00.000" });
    const completed = makeEvent({ start: "2026-10-01T10:00:00.000", end: "2026-10-02T10:00:00.000" });

    const result = classifyEvents([live, upcoming, completed], NOW);

    expect(ids(result.liveEvents)).toEqual([live.eventID]);
    expect(ids(result.upcomingEvents)).toEqual([upcoming.eventID]);
    expect(ids(result.completedEvents)).toEqual([completed.eventID]);
  });

  it("sets the status field on each classified event", () => {
    const { liveEvents, upcomingEvents, completedEvents } = classifyEvents(
      [
        makeEvent(),
        makeEvent({ start: "2026-11-01T10:00:00.000", end: "2026-11-02T10:00:00.000" }),
        makeEvent({ start: "2026-10-01T10:00:00.000", end: "2026-10-02T10:00:00.000" }),
      ],
      NOW,
    );

    expect(liveEvents[0].status).toBe("live");
    expect(upcomingEvents[0].status).toBe("upcoming");
    expect(completedEvents[0].status).toBe("completed");
  });

  it("doesn't modify the events passed in", () => {
    const event = makeEvent();
    classifyEvents([event], NOW);
    expect(event.status).toBeUndefined();
  });

  it("treats an event as live at exactly its start and its end", () => {
    const startsNow = makeEvent({ start: NOW.toISOString(), end: "2026-10-30T00:00:00.000Z" });
    const endsNow = makeEvent({ start: "2026-10-27T00:00:00.000Z", end: NOW.toISOString() });

    const { liveEvents } = classifyEvents([startsNow, endsNow], NOW);

    expect(ids(liveEvents).sort()).toEqual([startsNow.eventID, endsNow.eventID].sort());
  });

  it("sorts live by soonest end, upcoming by soonest start, completed by most recent end", () => {
    const liveLate = makeEvent({ end: "2026-11-05T00:00:00.000" });
    const liveSoon = makeEvent({ end: "2026-10-29T00:00:00.000" });
    const upLate = makeEvent({ start: "2026-12-01T00:00:00.000", end: "2026-12-02T00:00:00.000" });
    const upSoon = makeEvent({ start: "2026-11-01T00:00:00.000", end: "2026-11-02T00:00:00.000" });
    const doneOld = makeEvent({ start: "2026-09-01T00:00:00.000", end: "2026-09-02T00:00:00.000" });
    const doneRecent = makeEvent({ start: "2026-10-20T00:00:00.000", end: "2026-10-21T00:00:00.000" });

    const result = classifyEvents([liveLate, liveSoon, upLate, upSoon, doneOld, doneRecent], NOW);

    expect(ids(result.liveEvents)).toEqual([liveSoon.eventID, liveLate.eventID]);
    expect(ids(result.upcomingEvents)).toEqual([upSoon.eventID, upLate.eventID]);
    expect(ids(result.completedEvents)).toEqual([doneRecent.eventID, doneOld.eventID]);
  });

  it("skips events with unparsable dates", () => {
    const result = classifyEvents([makeEvent({ start: "not a date" }), makeEvent({ end: "soon" })], NOW);
    expect(Object.values(result).flat()).toHaveLength(0);
  });

  it("skips events with null dates instead of treating them as 1970", () => {
    const result = classifyEvents(
      [makeEvent({ start: null, end: null }), makeEvent({ start: null })],
      NOW,
    );
    expect(Object.values(result).flat()).toHaveLength(0);
  });

  describe("in the viewer's time zone", () => {
    afterEach(() => {
      process.env.TZ = "UTC";
    });

    // A Community Day at 14:00-17:00 local time, and the same instant in UTC.
    const communityDay = () =>
      makeEvent({ start: "2026-11-21T14:00:00.000", end: "2026-11-21T17:00:00.000" });
    const at = (iso: string) => new Date(iso);

    it("reads offset-less times as the viewer's local time", () => {
      process.env.TZ = "America/Los_Angeles"; // UTC-8 in November

      // 14:00 UTC is 06:00 in Los Angeles: not started yet there.
      expect(classifyEvents([communityDay()], at("2026-11-21T14:00:00Z")).upcomingEvents).toHaveLength(1);
      // 22:00 UTC is 14:00 in Los Angeles: live there.
      expect(classifyEvents([communityDay()], at("2026-11-21T22:00:00Z")).liveEvents).toHaveLength(1);
    });

    it("reads Z times as the same instant everywhere", () => {
      process.env.TZ = "Asia/Tokyo";
      const gbl = makeEvent({ start: "2026-11-01T20:00:00.000Z", end: "2026-11-15T20:00:00.000Z" });

      expect(classifyEvents([gbl], at("2026-11-01T20:00:00Z")).liveEvents).toHaveLength(1);
      expect(classifyEvents([gbl], at("2026-11-01T19:59:00Z")).upcomingEvents).toHaveLength(1);
    });
  });
});
