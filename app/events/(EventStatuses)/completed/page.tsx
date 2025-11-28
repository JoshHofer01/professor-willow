import EventDisplay from "@/components/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import React from "react";

const CompletedEvents = async () => {
  const { completedEvents } = await getEvents();
  return <EventDisplay events={completedEvents} pageType="Completed" />;
};

export default CompletedEvents;
