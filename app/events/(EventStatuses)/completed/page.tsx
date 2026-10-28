
import EventDisplay from "@/components/EventsGroup/EventDisplay";
import { getEvents } from "@/utils/getEvents";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Completed Events | ProfessorWillow",
  description: "View recently completed events in Pokemon GO",
  keywords: [
    "pokemon go",
    "pokemon go events",
    "professor willow",
  ],
  openGraph: {
    url: "https://professorwillow.me/events/completed",
    type: "website",
    title: "Completed Events | ProfessorWillow",
  }
}

const CompletedEvents = async () => {
  const events = await getEvents();
  return <EventDisplay events={events} status="completed" />;
};

export default CompletedEvents;
