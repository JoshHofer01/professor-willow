// app/events/page.tsx
import { OverviewPageCard } from "@/components/CustomCards/EventCards";
import { Button } from "@/components/shadcn/button";
import { GameEvent } from "@/interfaces/interfaces";
import { getEvents } from "@/utils/getEvents";
import { Metadata } from "next";
import Link from "next/link";
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
  }
}

const EventSection = ({
  title,
  events,
  color,
}: {
  title: string;
  events: GameEvent[];
  color: string;
}) => {
  const hasMoreThanThree = events.length > 3;

  return (
    <section className="mb-12 pl-6 relative">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${color}`}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex items-center mb-3 gap-x-4 w-full">
        <h2 className="text-3xl font-bold">{title}</h2>
        {hasMoreThanThree && events[0].status !== "live" && (
          <Link href={"/events/" + events[0].status}>
            <Button variant="outline">View {events.length} More</Button>
          </Link>
        )}
      </div>

      {/* Events List Container */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:overflow-x-auto lg:pb-4 lg:-mb-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <OverviewPageCard
              key={event.eventID}
              event={event}
              className={index >= 3 && event.status !== "live" ? "hidden" : ""}
            />
          ))
        ) : (
          <div className="text-muted-foreground italic h-24 flex items-center">
            <p>No {title.toLowerCase()} at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const EventsPage = async () => {
  const { liveEvents, upcomingEvents, completedEvents } = await getEvents();

  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Events Overview</h1>
        <p className="text-lg text-muted-foreground">
          Stay up to date with live, upcoming, and past events.
        </p>
      </div>

      <div className="space-y-8">
        {/* Event information fetch can be found in getEvents.tsx */}
        <EventSection
          title="Live Events"
          events={liveEvents}
          color="bg-green-500"
        />
        <EventSection
          title="Upcoming Events"
          events={upcomingEvents}
          color="bg-blue-500"
        />
        <EventSection
          title="Completed Events"
          events={completedEvents}
          color="bg-slate-500"
        />
      </div>
    </main>
  );
};

export default EventsPage;
