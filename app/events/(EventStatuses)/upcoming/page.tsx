import EventDisplay from "@/components/EventsGroup/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Upcoming Events | ProfessorWillow",
  description: "View upcoming events in Pokemon GO",
  keywords: [
    "pokemon go",
    "pokemon go events",
    "current events",
    "professor willow",
  ],
  openGraph: {
    url: "https://professorwillow.me/events/upcoming",
    type: "website",
    title: "Upcoming Events | ProfessorWillow",
  }
}

const UpcomingEvents = async () => {
  const { upcomingEvents } = await getEvents();
  return <EventDisplay events={upcomingEvents} pageType="Upcoming" />;
};

export default UpcomingEvents;
