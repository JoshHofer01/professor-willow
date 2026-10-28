import EventsOverview from "@/components/EventsGroup/EventsOverview";
import PageContainer from "@/components/PageContainer";
import { getEvents } from "@/utils/getEvents";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Events Overview | ProfessorWillow",
  description: "View all events in Pokemon GO",
  keywords: [
    "pokemon go",
    "pokemon go events",
    "current events",
    "event calendar",
    "professor willow",
  ],
  openGraph: {
    url: "https://professorwillow.me/events",
    type: "website",
    title: "Events Overview | ProfessorWillow",
  },
};

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <PageContainer
      title="Events Overview"
      description="Stay up to date with live, upcoming, and past events."
    >
      <EventsOverview events={events} />
    </PageContainer>
  );
};

export default EventsPage;
