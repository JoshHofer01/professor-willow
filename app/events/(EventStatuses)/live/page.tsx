import EventDisplay from "@/components/EventsGroup/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Events | ProfessorWillow",
  description: "View live events in Pokemon GO",
  keywords: [
    "pokemon go",
    "pokemon go events",
    "current events",
    "professor willow",
  ],
  openGraph: {
    url: "https://professorwillow.me/events/live",
    type: "website",
    title: "Live Events | ProfessorWillow",
  }
}

const LiveEvents = async () => {
  const { liveEvents } = await getEvents();
  return <EventDisplay events={liveEvents} pageType="Live" />;
};

export default LiveEvents;
