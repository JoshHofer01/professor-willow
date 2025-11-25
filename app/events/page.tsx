// app/events/page.tsx
import { EventEndingCountdown } from "@/components/EventEndingCountdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameEvent } from "@/interfaces/interfaces";
import { cn } from "@/lib/utils";
import { completedEvents, liveEvents, upcomingEvents } from "@/utils/getEvents";
import Image from "next/image";
import React from "react";


const EventCard = ({ event, className }: { event: GameEvent; className?: string; }) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const dateStart = dateFormatter.format(new Date(event.start));
  const dateEnd = dateFormatter.format(new Date(event.end))

  return (
    <Card className={cn("w-full lg:w-72 lg:shrink-0 transition-shadow hover:shadow-lg flex flex-row lg:flex-col overflow-hidden", className)}>
      {/* Image Container */}
      {event.image && (
        <div className="relative lg:w-full shrink-0 order-2 lg:order-1">
          <Image
            src={event.image}
            alt={event.name}
            width={1000}
            height={0}
            className="w-full h-full object-cover not-lg:max-h-28 not-lg:max-w-44 lg:h-36"
          />
          {/* Gradient fade for mobile only */}
          <div className="absolute inset-0 bg-linear-to-r from-card to-50% lg:hidden" />
        </div>
      )}
      
      {/* Content Container */}
      <div className="flex flex-col justify-center not-lg:grow order-1 lg:order-2">
        {event.eventType && <Badge variant="secondary" className="ml-2 mb-2 text-xs not-lg:hidden">{event.eventType}</Badge>}
        <CardHeader className="pt-3 px-4 lg:pt-0">
          <CardTitle className="text-base lg:text-base leading-tight not-lg:truncate">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 lg:pb-6">
          {event.isLive ? <div className="text-xs text-muted-foreground space-y-1">
            <EventEndingCountdown eventEnd={dateEnd}/>
          </div> : <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Starts:</strong> {dateStart}</p>
            <p><strong>Ends:</strong> {dateEnd}</p>
          </div>}
        </CardContent>
      </div>
    </Card>
  );
};

const EventSection = ({ title, events, color }: { title: string; events: GameEvent[]; color: string; }) => {
  const hasMoreThanThree = events.length > 3;

  return (
    <section className="mb-12 pl-6 relative">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${color}`} aria-hidden="true" />
      
      {/* Section Header */}
      <div className="flex justify-between items-center mb-3 pr-4 lg:pr-0">
        <h2 className="text-3xl font-bold">{title}</h2>
        {hasMoreThanThree && (
          <Button variant="ghost" className="lg:hidden">
            View All
          </Button>
        )}
      </div>
      
      {/* Events List Container */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:overflow-x-auto lg:pb-4 lg:-mb-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard 
              key={event.eventID} 
              event={event} 
              className={index >= 3 ? 'hidden lg:flex' : ''} 
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
  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Events Calendar</h1>
        <p className="text-lg text-muted-foreground">
          Stay up to date with live, upcoming, and past events.
        </p>
      </div>

      <div className="space-y-8">
        {/* Event information fetch can be found in getEvents.tsx */}
        <EventSection title="Live Events" events={liveEvents} color="bg-green-500" />
        <EventSection title="Upcoming Events" events={upcomingEvents} color="bg-blue-500" />
        <EventSection title="Completed Events" events={completedEvents} color="bg-slate-500" />
      </div>
    </main>
  );
};

export default EventsPage;