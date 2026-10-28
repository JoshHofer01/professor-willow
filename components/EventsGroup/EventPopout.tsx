"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { GameEvent } from "@/interfaces/interfaces";
import Image from "next/image";
import { weServTransformURL } from "@/utils/weServTransform";
import AddToCalendar from "../ClientComponents/AddToCalendar";
import Link from "next/link";
import EventTypeBadge from "./EventTypeBadge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../shadcn/button";
import { dateFormatter } from "@/utils/dateFormatter";
import Countdown from "./Countdown";
import { eventTypeColorMap } from "@/utils/maps";

// The trigger is a card, not a <button>, so it takes the button role and
// keyboard activation itself.
function activateOnEnterOrSpace(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.currentTarget.click();
  }
}

/**
 * Opens event details from a card. `children` must be a DOM element or a
 * component that passes its props to one, so the trigger's handlers land.
 */
const EventPopout = ({
  children,
  gameEvent,
}: {
  children: React.ReactNode;
  gameEvent: GameEvent;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        role="button"
        tabIndex={0}
        onKeyDown={activateOnEnterOrSpace}
        className="hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </DialogTrigger>
      <DialogContent
        className="max-w-[calc(100%-2rem)] sm:max-w-lg md:max-w-xl"
        aria-describedby={undefined}
      >
        {/* Image */}
        <div className="flex flex-col">
          <Image
            src={weServTransformURL(gameEvent.image, "popoutImage")}
            width={560}
            height={310}
            alt={gameEvent.name}
            className={cn(eventTypeColorMap[gameEvent.eventType], "rounded-lg border-x-3 border-t-3")}
          />
          <EventTypeBadge eventType={gameEvent.eventType} eventHeading={gameEvent.heading} className="rounded" />
        </div>
        <div id="content" className="flex flex-col gap-1">
          {/* Title */}
          <DialogTitle className="text-2xl sm:text-xl font-bold">{gameEvent.name}</DialogTitle>
          {/* Dates */}
          <div className="flex flex-row gap-2">
            <p>{dateFormatter.format(new Date(gameEvent.start))}</p>
            <p>-</p>
            <p>{dateFormatter.format(new Date(gameEvent.end))}</p>
          </div>
          {/* LeekDuck URL */}
          <Link
            href={gameEvent.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 text-primary/80 text-xs"
          >
            {gameEvent.link}
          </Link>
        </div>
        <DialogFooter>
          {/* Timing badge */}
          {/* Styled like an outline button, but it's information, not a control. */}
          <div className={cn(buttonVariants({ variant: "outline" }), "rounded-3xl max-w-47.5 h-11.25")}>
            <Countdown event={gameEvent} />
          </div>
          {/* AddToCalendar */}
          {gameEvent.status === "upcoming" ? (
            <AddToCalendar eventDetails={gameEvent} />
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopout;
