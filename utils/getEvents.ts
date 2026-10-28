import { GameEvent } from "@/interfaces/interfaces";
import { fetchJson } from "./fetchJson";

/**
 * All events from ScrapedDuck, unclassified.
 *
 * Live/upcoming/completed depends on the viewer's clock and time zone, so
 * it's worked out in the browser with `classifyEvents`, not here.
 * Resolves to `[]` during an outage so pages render their empty states.
 */
export async function getEvents(): Promise<GameEvent[]> {
  const events = await fetchJson<GameEvent[]>(
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json",
    { source: "getEvents", revalidate: 180 },
  );

  return (events ?? []).map((event) => ({
    ...event,
    eventType: event.eventType.split(" ")[0],
  }));
}
