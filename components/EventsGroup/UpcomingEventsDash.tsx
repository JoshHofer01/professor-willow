"use client";

import { GameEvent } from "@/interfaces/interfaces";
import { useClassifiedEvents } from "@/hooks/use-classified-events";
import ErrorPage from "../ErrorPage";
import { EventDiffToNow } from "../ClientComponents/EventDiffToNow";
import { Skeleton } from "../shadcn/skeleton";
import EventPopout from "./EventPopout";
import { eventTypeColorMap } from "@/utils/maps";

// Number of upcoming events shown on the dashboard.
const PILL_COUNT = 5;

const EventPill = ({ event }: { event: GameEvent }) => {
  const color = eventTypeColorMap[event.eventType] ?? "bg-gray-400";
  return (
    <div className={`${color} my-1 rounded-lg flex flex-1 justify-between`}>
      <p className="px-2 py-2 truncate text-xs font-bold text-black">
        {event.name}
      </p>
      <div className="bg-nav-accent my-1 mr-1 rounded-lg text-xs items-center flex px-2">
        <EventDiffToNow eventEnd={event.start} />
      </div>
    </div>
  );
};

const UpcomingEventsDashboard = ({ events }: { events: GameEvent[] }) => {
  const upcomingEvents = useClassifiedEvents(events)?.upcomingEvents;

  if (!upcomingEvents) {
    return (
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: PILL_COUNT }, (_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
    );
  }

  if (upcomingEvents.length === 0) {
    return <ErrorPage message="No upcoming events right now" />;
  }

  return (
    <div className="grid grid-cols-1 overflow-hidden">
      {upcomingEvents.slice(0, PILL_COUNT).map((gameEvent) => (
        <EventPopout key={gameEvent.eventID} gameEvent={gameEvent}>
          <EventPill event={gameEvent} />
        </EventPopout>
      ))}
    </div>
  );
};

export default UpcomingEventsDashboard;
