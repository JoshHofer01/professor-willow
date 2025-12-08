import { getEvents } from "@/utils/getEvents";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventTypeBadge from "./EventTypeBadge";

const EventDetails = async ({ eventId }: { eventId: string }) => {
  const { eventsData } = await getEvents();
  const event = eventsData.find((e) => e.eventID === eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <div className="pb-8">
        <Image
          src={event.image}
          alt={event.name}
          width={2500}
          height={2500}
          className="max-h-[450px] w-full object-contain rounded-lg"
          loading="lazy"
        />
      </div>
      <Card className="overflow-hidden mx-auto">
        <CardHeader>
          <CardTitle className="pt-4 text-2xl">{event.name}</CardTitle>
          <CardDescription><EventTypeBadge eventType={event.eventType}/></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Starts:</p>
                <p>{new Date(event.start).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Ends:</p>
                <p>{new Date(event.end).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4 py-4 border-t">
          <div className="text-sm text-gray-600">
            <h3 className="text-lg font-semibold pb-2">
              LeekDuck may contain more information about {event.name}
            </h3>
            <div className="flex flex-row">
              <p>
                For additional details, dates, and region-specific information,
                please visit the official LeekDuck event page.
              </p>
              <Button asChild>
                <Link
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-5"
                >
                  Visit LeekDuck
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventDetails;
