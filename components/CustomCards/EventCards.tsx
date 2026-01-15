import { GameEvent } from "@/interfaces/interfaces";
import Image from "next/image";
import { EventDiffToNow } from "../ClientComponents/EventDiffToNow";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import EventTypeBadge from "../EventsGroup/EventTypeBadge";
import { weServTransformURL } from "@/utils/weServTransform";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const EventPageCard = ({ event }: { event: GameEvent }) => {
  return (
    <Card className="gap-2">
      <Link href={`${event.eventID}`}>
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
          <CardContent className="px-4 pb-3">
            <CardTimings event={event} />
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export const OverviewPageCard = ({
  event,
  className,
}: {
  event: GameEvent;
  className?: string;
}) => {
  return (
    <Card
      className={cn("w-full lg:w-72 lg:shrink-0 overflow-hidden", className)}
    >
      <Link
        href={`events/${event.eventID}`}
        className="w-full lg:w-72 flex flex-row lg:flex-col"
      >
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
            <CardTimings event={event} />
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

const CardTimings = ({ event }: { event: GameEvent }) => {
  const endFormatted = dateFormatter.format(new Date(event.end));
  return (
    <>
      {event.status === "live" ? (
        <div className="text-xs text-muted-foreground space-y-1 ">
          <div className="flex flex-row space-x-1">
            <p>
              <strong>Ends in:</strong>
            </p>
            <EventDiffToNow eventEnd={event.end} />
          </div>
          <p className="hidden sm:block">({endFormatted})</p>
        </div>
      ) : event.status === "upcoming" ? (
        <div className="text-xs text-muted-foreground space-y-1 ">
          <div className="flex flex-row space-x-1">
            <p>
              <strong>Starts in:</strong>
            </p>
            <EventDiffToNow eventEnd={event.start} />
          </div>
          <p className="hidden sm:block">
            <strong>Ends:</strong> {endFormatted}
          </p>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Completed on:</strong> {event.end}
          </p>
        </div>
      )}
    </>
  );
};
