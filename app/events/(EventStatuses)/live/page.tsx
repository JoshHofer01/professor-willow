import EventDisplay from "@/components/EventsGroup/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import React from "react";

const LiveEvents = async () => {
  const { liveEvents } = await getEvents();
  return <EventDisplay events={liveEvents} pageType="Live" />;
};

export default LiveEvents;
