import { GameEvent } from "@/interfaces/interfaces";

export interface ClassifiedEvents {
  liveEvents: GameEvent[];
  upcomingEvents: GameEvent[];
  completedEvents: GameEvent[];
}

/**
 * Splits events into live, upcoming and completed at `now`, sets each
 * event's `status`, and sorts each list.
 *
 * Call this in the browser. Most ScrapedDuck times have no UTC offset and
 * mean the player's local time, and `new Date()` reads them in the time
 * zone of whatever runs it. Times ending in `Z` are global instants.
 */
export function classifyEvents(events: GameEvent[], now: Date): ClassifiedEvents {
  const liveEvents: GameEvent[] = [];
  const upcomingEvents: GameEvent[] = [];
  const completedEvents: GameEvent[] = [];

  for (const event of events) {
    // ScrapedDuck sends null for unknown dates, and new Date(null) is 1970.
    if (!event.start || !event.end) continue;
    const start = new Date(event.start);
    const end = new Date(event.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) continue;

    if (now >= start && now <= end) {
      liveEvents.push({ ...event, status: "live" });
    } else if (now < start) {
      upcomingEvents.push({ ...event, status: "upcoming" });
    } else {
      completedEvents.push({ ...event, status: "completed" });
    }
  }

  const time = (date: string) => new Date(date).getTime();
  liveEvents.sort((a, b) => time(a.end) - time(b.end));
  upcomingEvents.sort((a, b) => time(a.start) - time(b.start));
  completedEvents.sort((a, b) => time(b.end) - time(a.end));

  return { liveEvents, upcomingEvents, completedEvents };
}
