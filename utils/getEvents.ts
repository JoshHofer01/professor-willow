import { GameEvent } from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";

export async function getEvents() {
  const response = await fetch(
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json",
    { next: { revalidate: 180 } }
  );
  const eventsData: GameEvent[] = await response.json();

  const now = new Date();
  const liveEvents: GameEvent[] = [];
  const upcomingEvents: GameEvent[] = [];
  const completedEvents: GameEvent[] = [];

  eventsData.forEach((event) => {
    try {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return;
      }
      event.eventType = event.eventType.split(" ")[0]
      if (now >= startDate && now <= endDate) {
        liveEvents.push({ ...event, status: "live" });
      } else if (now < startDate) {
        upcomingEvents.push({ ...event, status: "upcoming" });
      } else {
        completedEvents.push({ ...event, status: "completed" });
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Invalid event:", event, err);
      } else {
        Sentry.captureException(err);
      }
    }
  });

  liveEvents.sort(
    (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime()
  );
  upcomingEvents.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  completedEvents.sort(
    (a, b) => new Date(b.end).getTime() - new Date(a.end).getTime()
  );

  return { liveEvents, upcomingEvents, completedEvents, eventsData };
}
