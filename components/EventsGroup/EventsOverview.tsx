"use client";

import { OverviewPageCard } from "@/components/CustomCards/EventCards";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useClassifiedEvents } from "@/hooks/use-classified-events";
import { GameEvent } from "@/interfaces/interfaces";
import Link from "next/link";
import EventPopout from "./EventPopout";

// Upcoming and completed sections show this many cards before "View all".
const PREVIEW_COUNT = 3;

const EventSection = ({
  title,
  events,
  color,
  viewAllHref,
}: {
  title: string;
  events: GameEvent[] | null;
  color: string;
  viewAllHref?: string;
}) => {
  const shown = viewAllHref ? events?.slice(0, PREVIEW_COUNT) : events;

  return (
    <section className="mb-12 pl-6 relative">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${color}`}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex items-center mb-3 gap-x-4 w-full">
        <h2 className="text-3xl font-bold">{title}</h2>
        {viewAllHref && events && events.length > PREVIEW_COUNT && (
          <Button variant="outline" asChild>
            <Link href={viewAllHref}>View all {events.length}</Link>
          </Button>
        )}
      </div>

      {/* Events List Container */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:overflow-x-auto lg:pb-4 lg:-mb-4">
        {!shown ? (
          Array.from({ length: PREVIEW_COUNT }, (_, i) => (
            <Skeleton key={i} className="h-28 w-full lg:h-56 lg:w-72" />
          ))
        ) : shown.length > 0 ? (
          shown.map((event) => (
            <EventPopout key={event.eventID} gameEvent={event}>
              <OverviewPageCard event={event} />
            </EventPopout>
          ))
        ) : (
          <div className="text-muted-foreground italic h-24 flex items-center">
            <p>No {title.toLowerCase()} at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const EventsOverview = ({ events }: { events: GameEvent[] }) => {
  const classified = useClassifiedEvents(events);

  return (
    <div className="space-y-8">
      <EventSection
        title="Live Events"
        events={classified?.liveEvents ?? null}
        color="bg-green-500"
      />
      <EventSection
        title="Upcoming Events"
        events={classified?.upcomingEvents ?? null}
        color="bg-blue-500"
        viewAllHref="/events/upcoming"
      />
      <EventSection
        title="Completed Events"
        events={classified?.completedEvents ?? null}
        color="bg-slate-500"
        viewAllHref="/events/completed"
      />
    </div>
  );
};

export default EventsOverview;
