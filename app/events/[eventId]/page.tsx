import EventDetails from "@/components/EventsGroup/EventDetails";
import { getEvents } from "@/utils/getEvents";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ eventId: string }>;
};

export async function generateMetadata(
  { params}: Props
): Promise<Metadata> {
  const { eventId } = await params;

  const { eventsData } = await getEvents();
  const event = eventsData.find((e) => e.eventID === eventId);

  if (!event)
    return {
      title: "Not Found | ProfessorWillow",
      description: "Event not found",
    };

  return {
    title: `${event.name} | ProfessorWillow`,
    description: `Learn about ${event.name} event in Pokemon GO!`,
    openGraph: {
      title: `${event.name} | ProfessorWillow`,
      description: `Learn about ${event.name} event in Pokemon GO!`,
      type: "website",
      url: `https://professorwillow.me/events/${event.eventID}`,
    },
  };
}

const EventPage = async ({ params }: Props) => {
  const { eventId } = await params;

  const { eventsData } = await getEvents();
  const event = eventsData.find((e) => e.eventID === eventId);

  if (!event) {
      notFound();
    }

  return <EventDetails event={event} />;
};
export default EventPage;
