import { GameEvent } from "@/interfaces/interfaces";
import { getEvents } from "@/utils/getEvents";
import React from "react";
import ErrorPage from "../ErrorPage";
import { EventDiffToNow } from "../ClientComponents/EventDiffToNow";
import Link from "next/link";
import { eventTypeColorMap } from "./EventTypeBadge";

const EventPill = ({ event }: { event: GameEvent }) => {
  const color = eventTypeColorMap[event.eventType] ?? "to-gray-400";
  return (
    <Link href={`events/${event.eventID}`}>
      <div className={`${color} my-1 rounded-lg flex flex-1 justify-between`}>
        <p className="px-2 py-2 truncate text-xs font-bold text-black">
          {event.name}
        </p>
        <div className="bg-nav-accent my-1 mr-1 rounded-lg text-xs items-center flex px-2">
          <EventDiffToNow eventEnd={event.start} short />
        </div>
      </div>
    </Link>
  );
};

const UpcomingEventsDashboard = async () => {
  const { upcomingEvents } = await getEvents();

  if (!upcomingEvents) {
    return <ErrorPage message="Error getting upcoming events" />;
  }

  // Modify latter number to change amount of pills shown
  const slicedEvents = upcomingEvents.slice(0, 5);

  return (
    <div className="grid grid-cols-1 overflow-hidden">
      {slicedEvents.map((event) => (
        <EventPill key={event.eventID} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEventsDashboard;
