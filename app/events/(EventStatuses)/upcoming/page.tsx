import EventDisplay from "@/components/EventsGroup/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import React from "react";

const UpcomingEvents = async () => {
  const { upcomingEvents } = await getEvents();
  return <EventDisplay events={upcomingEvents} pageType="Upcoming" />;
};

export default UpcomingEvents;
