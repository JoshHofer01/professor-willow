// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import { makeEvent } from "@/test/fixtures/events";
import { json, mockFetch } from "@/test/mockFetch";
import { getEvents } from "./getEvents";

const EVENTS_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";

// Live/upcoming/completed classification is tested in classifyEvents.test.ts.
describe("getEvents", () => {
  it("requests the ScrapedDuck events feed, cached for 3 minutes", async () => {
    const stub = mockFetch({ [EVENTS_URL]: json([]) });
    await getEvents();
    expect(stub).toHaveBeenCalledWith(EVENTS_URL, { next: { revalidate: 180 } });
  });

  it("returns every event, including ones without dates", async () => {
    const events = [makeEvent(), makeEvent({ start: null, end: null })];
    mockFetch({ [EVENTS_URL]: json(events) });

    const result = await getEvents();

    expect(result.map((e) => e.eventID)).toEqual(events.map((e) => e.eventID));
  });

  it("keeps only the first word of the event type", async () => {
    mockFetch({ [EVENTS_URL]: json([makeEvent({ eventType: "community-day extra words" })]) });
    const [event] = await getEvents();
    expect(event.eventType).toBe("community-day");
  });

  it("doesn't classify events on the server", async () => {
    mockFetch({ [EVENTS_URL]: json([makeEvent()]) });
    const [event] = await getEvents();
    expect(event.status).toBeUndefined();
  });

  describe("when the feed is unavailable", () => {
    it.each([
      ["a non-OK response", () => new Response("Server error", { status: 500 })],
      ["a body that isn't JSON", () => new Response("<html>oops</html>")],
      ["a network failure", () => new TypeError("fetch failed")],
    ])("resolves to [] on %s and reports it once", async (_, response) => {
      mockFetch({ [EVENTS_URL]: response });
      await expect(getEvents()).resolves.toEqual([]);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    });
  });
});
