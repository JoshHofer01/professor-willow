import { describe, expect, it } from "vitest";
import { makeEvent } from "@/test/fixtures/events";
import { json, mockFetch } from "@/test/mockFetch";
import { NotFoundError } from "@/test/mocks/navigation";
import EventPage, { generateMetadata } from "./page";

const EVENTS_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";
const params = (eventId: string) => ({ params: Promise.resolve({ eventId }) });

const event = makeEvent({ eventID: "pawniard-community-day", name: "Pawniard Community Day" });

describe("/events/[eventId]", () => {
  it("renders a known event", async () => {
    mockFetch({ [EVENTS_URL]: json([event]) });
    await expect(EventPage(params(event.eventID))).resolves.toBeTruthy();
  });

  it("returns a 404 for an unknown event", async () => {
    mockFetch({ [EVENTS_URL]: json([event]) });
    await expect(EventPage(params("nope"))).rejects.toBeInstanceOf(NotFoundError);
  });

  it("titles the page with the event name", async () => {
    mockFetch({ [EVENTS_URL]: json([event]) });
    const metadata = await generateMetadata(params(event.eventID));
    expect(metadata.title).toBe("Pawniard Community Day | ProfessorWillow");
    expect(metadata.openGraph?.url).toBe(
      "https://professorwillow.me/events/pawniard-community-day",
    );
  });

  it("titles unknown events as not found", async () => {
    mockFetch({ [EVENTS_URL]: json([event]) });
    const metadata = await generateMetadata(params("nope"));
    expect(metadata.title).toBe("Not Found | ProfessorWillow");
  });

  it("returns a 404 instead of crashing when the feed is down", async () => {
    mockFetch({ [EVENTS_URL]: new TypeError("fetch failed") });
    await expect(EventPage(params(event.eventID))).rejects.toBeInstanceOf(NotFoundError);
  });
});
