import React from "react";
import { GameEvent } from "@/interfaces/interfaces";
import { EventPageCard } from "../CustomCards/EventCards";
import BackToTopButton from "../ClientComponents/BackToTopButton";
import EventPopout from "./EventPopout";
import PageContainer from "../PageContainer";

const EventDisplay = ({
  events,
  pageType,
}: {
  events: GameEvent[];
  pageType: string;
}) => {
  return (
    <PageContainer title={`${pageType} Events`}>
      <BackToTopButton />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {events.length > 0 ? (
          events.map((gameEvent) => (
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
