"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { GameEvent } from "@/interfaces/interfaces";
import Image from "next/image";
import { weServTransformURL } from "@/utils/weServTransform";
import EventPopout from "../EventsGroup/EventPopout";
import { Skeleton } from "../shadcn/skeleton";
import { useClassifiedEvents } from "@/hooks/use-classified-events";

export function CurrentEventsCarousel({ events }: { events: GameEvent[] }) {
  const eventData = useClassifiedEvents(events)?.liveEvents;

  if (!eventData) {
    return <Skeleton className="w-full aspect-video rounded-2xl" />;
  }

  if (eventData.length === 0) {
    return (
      <p className="text-muted-foreground italic">No live events right now.</p>
    );
  }

  return (
    <>
      <Carousel
        plugins={[
        Autoplay({
          delay: 2000,
          stopOnMouseEnter: true,
        }),
      ]}
        className="w-full border-x border-b rounded-2xl"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {eventData.map((event, index) => (
            <CarouselItem key={event.eventID} className="pl-2 md:pl-4 basis-full">
              <EventPopout gameEvent={event}>
                <div className="p-1">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={weServTransformURL(event.image, "dashboardImage")}
                      alt={event.name}
                      className="rounded-lg object-cover"
                      width={900}
                      height={500}
                      quality={75}
                      preload
                    />
                  </div>
                  <div className="text-white flex flex-col md:text-base text-sm font-semibold mt-2 text-center">
                    <p className="px-3">{event.name}</p>
                    <p className="text-muted-foreground">
                      {index + 1}/{eventData.length}
                    </p>
                  </div>
                </div>
              </EventPopout>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
