import { GameEvent } from "@/interfaces/interfaces";

const response = await fetch(
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json"
  );
  const eventsData: GameEvent[] = await response.json();

  const now = new Date();
  export const liveEvents: GameEvent[] = [];
  export const upcomingEvents: GameEvent[] = [];
  export const completedEvents: GameEvent[] = [];

  eventsData.forEach((event) => {
    try {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return;
      }
      if (now >= startDate && now <= endDate) {
        event.isLive = true;
        liveEvents.push(event);
      } else if (now < startDate) {
        upcomingEvents.push(event);
      } else {
        completedEvents.push(event);
      }
    } catch {
      // Fail silently for any malformed event data
    }
  });

  liveEvents.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
  upcomingEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  completedEvents.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime());
