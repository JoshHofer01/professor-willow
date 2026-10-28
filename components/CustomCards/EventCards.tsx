import { GameEvent } from "@/interfaces/interfaces";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import EventTypeBadge from "../EventsGroup/EventTypeBadge";
import { weServTransformURL } from "@/utils/weServTransform";
import { dateFormatter } from "@/utils/dateFormatter";
import Countdown from "../EventsGroup/Countdown";
import type React from "react";

// Card props pass through to the root element so the cards can be popout
// triggers (EventPopout uses Radix asChild).
type CardProps = Omit<React.ComponentProps<typeof Card>, "children">;

export const EventPageCard = ({
  event,
  className,
  ...props
}: { event: GameEvent } & CardProps) => {
  return (
    <Card className={cn("gap-2", className)} {...props}>
      {/* Image Container */}
      {event.image && (
        <div className="flex flex-col lg:w-full">
          <Image
            src={weServTransformURL(event.image, "eventCardImage")}
            alt={event.name}
            width={300}
            height={200}
            className="w-full h-36 object-cover"
            loading="eager"
          />
          {event.eventType && (
            <EventTypeBadge
              eventType={event.eventType}
              eventHeading={event.heading}
              className="mb-2 text-xs"
            />
          )}
        </div>
      )}

      {/* Content Container */}
      <div className="flex flex-col justify-center not-lg:grow order-1 lg:order-2">
        <CardHeader className="px-4">
          <CardTitle className="text-base lg:text-base leading-tight not-lg:truncate">
            {event.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 lg:pb-6">
          {event.status ? (
            <FilterTimings
              status={event.status}
              start={event.start}
              end={event.end}
            />
          ) : null}
          <Countdown event={event} />
        </CardContent>
      </div>
    </Card>
  );
};

export const OverviewPageCard = ({
  event,
  className,
  ...props
}: { event: GameEvent } & CardProps) => {
  return (
    <Card
      className={cn("w-full lg:w-72 lg:shrink-0 overflow-hidden", className)}
      {...props}
    >
      <div className="w-full lg:w-72 flex flex-row lg:flex-col">
        {/* Image Container */}
        {event.image && (
          <div className="relative lg:w-full shrink-0 order-2 lg:order-1">
            <Image
              src={weServTransformURL(event.image, "eventCardImage")}
              alt={event.name}
              width={300}
              height={200}
              className="w-full h-full object-cover not-lg:max-h-28 not-lg:max-w-44 lg:h-36"
              loading="eager"
            />
            {/* Gradient fade for mobile only */}
            <div className="absolute inset-0 bg-linear-to-r from-card to-50% lg:hidden" />
          </div>
        )}

        {/* Content Container */}
        <div className="flex flex-col justify-center not-lg:grow order-1 lg:order-2">
          {event.eventType && (
            <EventTypeBadge
              eventType={event.eventType}
              eventHeading={event.heading}
              className="mb-2 text-xs not-lg:hidden"
            />
          )}
          <CardHeader className="pt-3 px-4 lg:pt-0">
            <CardTitle className="text-base lg:text-base leading-tight not-lg:truncate">
              {event.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 lg:pb-6">
            {event.status ? (
              <FilterTimings
                status={event.status}
                start={event.start}
                end={event.end}
              />
            ) : null}
            <Countdown event={event} className="hidden sm:block" />
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

const FilterTimings = ({
  status,
  start,
  end,
}: {
  status: string;
  start: string;
  end: string;
}) => {
  return (
    <>
      {status === "upcoming" ? (
        <div className="flex flex-row text-xs text-muted-foreground gap-1">
          <p className="font-bold">Starts:</p>
          <p>{dateFormatter.format(new Date(start))}</p>
        </div>
      ) : status === "live" ? (
        <div className="flex flex-row text-xs text-muted-foreground gap-1">
          <p className="font-bold">Ends:</p>
          <p>{dateFormatter.format(new Date(end))}</p>
        </div>
      ) : null}
    </>
  );
};
