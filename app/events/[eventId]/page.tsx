
import EventDetails from "@/components/EventsGroup/EventDetails";
import React from "react";

type Props = { 
    params: Promise<{eventId: string}>;
};

const EventPage =  async ({ params }: Props) => {
  const { eventId } = await params;

  return <EventDetails eventId={eventId}/>;
};

export default EventPage;
