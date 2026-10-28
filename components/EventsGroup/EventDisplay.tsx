"use client";

import React from "react";
import { GameEvent } from "@/interfaces/interfaces";
import { useClassifiedEvents } from "@/hooks/use-classified-events";
import { EventPageCard } from "../CustomCards/EventCards";
import BackToTopButton from "../ClientComponents/BackToTopButton";
import EventPopout from "./EventPopout";
import PageContainer from "../PageContainer";
import { Skeleton } from "../shadcn/skeleton";

export type EventStatus = "live" | "upcoming" | "completed";

const pageTitles: Record<EventStatus, string> = {
  live: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
};

const EventDisplay = ({
  events,
  status,
}: {
  events: GameEvent[];
  status: EventStatus;
}) => {
  const classified = useClassifiedEvents(events);
  const pageType = pageTitles[status];
  const shown = classified?.[`${status}Events`];

  return (
    <PageContainer title={`${pageType} Events`}>
      <BackToTopButton />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {!shown ? (
          Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))
        ) : shown.length > 0 ? (
          shown.map((gameEvent) => (
            <EventPopout key={gameEvent.eventID} gameEvent={gameEvent}>
              <EventPageCard event={gameEvent} />
            </EventPopout>
          ))
        ) : (
          <div>No {pageType.toLowerCase()} events found.</div>
        )}
      </div>
    </PageContainer>
  );
};

export default EventDisplay;
